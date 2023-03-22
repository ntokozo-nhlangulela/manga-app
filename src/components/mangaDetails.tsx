import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Divider, Pagination, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaApis from "../agent/api";
import MangaList from "../models/mangaList";
import appPaths from "../shared/paths";

interface mangaDetailsProps {
  mangaInformation: MangaList;
}

interface chapterDto {
  title?: string;
  chapterNo?: number;
  volume?: number;
  pages?: number;
  chapterId?: string;
  pageNumber?: number;
}

interface test {
  indexNumber: number;
  pageNumber: number;
}

const MangaDetails = () => {
  const navigate = useNavigate();
  const isRendered = useRef<boolean>(false);
  const [mangaInformation, setMangaInformation] = useState<MangaList>();
  const [chapterList, setChapterList] = useState<chapterDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const mangaId: string = String(window.location.search.substring(1));
  let currentMaxRange: number = 9;
  let pageNo: number = 1;

  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
      MangaApis.getAllMangas().then((response) => {
        const matchingRecord = response.data.find(
          (item: any) => item.id === mangaId
        );
        let name = "";
        let author = "";
        matchingRecord.relationships.forEach((i: any) => {
          if (i.type === "cover_art") {
            name = i.attributes.fileName;
          }

          if (i.type === "author") {
            author = i.attributes.name;
          }
        });

        setMangaInformation({
          mangaId: matchingRecord.id,
          title: matchingRecord.attributes.title["en"],
          description: matchingRecord.attributes.description["en"],
          year: matchingRecord.attributes.year || 2023,
          status: matchingRecord.attributes.status,
          author: author,
          version: matchingRecord.attributes.version,
          fileName: name,
          state: matchingRecord.attributes.state,
          rating: matchingRecord.attributes.contentRating,
        });
      });

      MangaApis.getMangaDetails(mangaId).then((response) => {
        const noOfChapters: number = response.data.length;
        const tempArray: chapterDto[] = response.data.map((item: any) => ({
          chapterNo: Number(item.attributes.chapter),
          title: item.attributes.title ?? `Chapter ${item.attributes.chapter}`,
          volume: item.attributes.volume,
          pages: Number(item.attributes.pages),
          chapterId: item.id,
        }));
        const sortedChapterList = tempArray.sort(sortFunction);
        setPageCount(noOfChapters > 10 ? Math.floor(noOfChapters / 10) : 1);

        sortedChapterList.forEach((info: any, index: number) => {
          setChapterList((prev) => [
            ...prev,
            {
              chapterNo: Number(info.chapterNo),
              title: info.title || `Chapter ${info.chapterNo}`,
              volume: info.volume,
              pages: Number(info.pages),
              chapterId: info.chapterId,
              pageNumber: assignPageNumber(index),
            },
          ]);
        });
      });
    }
  }, []);

  const sortFunction = (a: chapterDto, b: chapterDto) => {
    return a.chapterNo! - b.chapterNo!;
  };

  const assignPageNumber = (index: number): number => {
    if (index <= currentMaxRange) {
      return pageNo;
    } else {
      currentMaxRange = currentMaxRange + 10;
      pageNo++;
      return pageNo;
    }
  };

  return (
    <div style={{ padding: "70px" }}>
      <Grid
        container
        xs={12}
        item>
        {mangaInformation && (
          <>
            <Grid
              xs={3}
              item>
              <img
                src={`https://uploads.mangadex.org/covers/${mangaInformation.mangaId}/${mangaInformation.fileName}`}
                alt='Girl in a jacket'
                width='200'
                height='300'
              />
              <Grid
                xs={12}
                container
                item>
                <Grid>
                  <Typography
                    style={{ paddingTop: "30px", fontWeight: "bold" }}>
                    Title
                  </Typography>
                  <Button
                    style={{ marginTop: "10px" }}
                    size='small'
                    variant='outlined'>
                    {mangaInformation.title}
                  </Button>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                item
                container>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Author
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation.author}
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Status
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation.status}
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Version
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation.version}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                item
                container>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Chapters
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      6
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Year
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation.year}
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      State
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation?.state}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                item
                container>
                <Grid
                  xs={3}
                  item>
                  <Grid>
                    <Typography
                      style={{ paddingTop: "15px", fontWeight: "bold" }}>
                      Rating
                    </Typography>
                    <Button
                      style={{ marginTop: "10px" }}
                      size='small'
                      variant='outlined'>
                      {mangaInformation?.rating}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              xs={9}
              item>
              <Typography
                style={{ fontSize: 50, width: "90%", fontWeight: "bold" }}>
                {mangaInformation.title.toLocaleUpperCase()}
              </Typography>

              <Typography style={{ width: "90%" }}>
                {mangaInformation.description}
              </Typography>

              <Accordion style={{ marginTop: "20px", width: "90%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  style={{ backgroundColor: "lightgray" }}>
                  <Typography>Chapters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {chapterList
                    .filter((item) => item.pageNumber === currentPage)
                    .map((x) => {
                      return (
                        <>
                          <Grid
                            xs={12}
                            container
                            item
                            style={{
                              marginBottom: "15px",
                              marginTop: "5px",
                            }}
                            key={x.chapterId}>
                            <Grid
                              xs={12}
                              container
                              item>
                              <Grid
                                style={{
                                  fontSize: "small",
                                  paddingTop: "3px",
                                }}>
                                {`Title: ${x.title}`}
                              </Grid>
                            </Grid>

                            <Grid
                              xs={12}
                              container
                              item>
                              <Grid
                                style={{
                                  fontSize: "small",
                                  paddingTop: "3px",
                                }}>
                                {`Ch. no: ${x.chapterNo}`}
                              </Grid>
                            </Grid>

                            <Grid
                              xs={12}
                              container
                              item>
                              <Grid
                                style={{
                                  fontSize: "small",
                                  paddingTop: "3px",
                                }}>
                                {`Volume. no: ${x.volume}`}
                              </Grid>
                            </Grid>

                            <Grid
                              xs={12}
                              container
                              item>
                              <Grid
                                style={{
                                  fontSize: "small",
                                  paddingTop: "3px",
                                }}>
                                {`Pages: ${x.pages}`}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            alignSelf={"right"}
                            justifyContent='flex-end'
                            style={{
                              paddingBottom: "5px",
                            }}>
                            <Button
                              variant='contained'
                              color='success'
                              size='small'
                              style={{ fontSize: 9 }}
                              onClick={() => {
                                navigate(
                                  `${appPaths.viewManga}?${x.chapterId}`
                                );
                              }}>
                              Read Chapter
                            </Button>
                          </Grid>
                          <Divider light />
                        </>
                      );
                    })}
                  <Stack
                    spacing={2}
                    style={{ alignItems: "center", paddingTop: "25px" }}>
                    <Pagination
                      count={pageCount}
                      onChange={(_, pageNo) => {
                        setCurrentPage(pageNo);
                      }}
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default MangaDetails;
