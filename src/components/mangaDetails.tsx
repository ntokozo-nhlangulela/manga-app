import { Person } from "@mui/icons-material";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import NumbersIcon from "@mui/icons-material/Numbers";
import TitleIcon from "@mui/icons-material/Title";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import MangaApis from "../agent/api";
import MangaList from "../models/mangaList";

interface mangaDetailsProps {
  mangaInformation: MangaList;
}

const MangaDetails = () => {
  //const { mangaInformation } = props;
  const isRendered = useRef<boolean>(false);
  const [mangaInformation, setMangaInformation] = useState<MangaList>();
  const [chapterList, setChapterList] = useState<any[]>([]);
  const mangaId: string = String(window.location.search.substring(1));

  //ToDo: Refactor this useEffect
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
        });
      });
    }
  }, []);

  useEffect(() => {
    MangaApis.getMangaDetails(mangaId).then((response) => {
      console.log("Checking chapters: ", response.data);
    });
  }, [mangaId]);

  return (
    <div style={{ padding: "30px 0px 30px 30px" }}>
      <Grid
        container
        xs={12}
        item>
        {mangaInformation && (
          <>
            <Grid xs={3}>
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
                <Grid
                  xs={1}
                  item>
                  <TitleIcon style={{ paddingTop: "30px" }} />
                </Grid>
                <Grid>
                  <Typography style={{ paddingTop: "30px" }}>
                    {`Title: ${mangaInformation.title}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                item
                container>
                <Grid xs={1}>
                  <Person style={{ paddingTop: "10px" }} />
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      paddingTop: "10px",
                    }}>
                    {`Author: ${mangaInformation?.author}`}
                  </Typography>
                </Grid>
              </Grid>

              {/* <Typography
              style={{
                paddingTop: "10px",
              }}>{`Description: ${mangaInformation.description}`}</Typography> */}

              <Grid
                xs={12}
                item
                container>
                <Grid xs={1}>
                  <NumbersIcon style={{ paddingTop: "10px" }} />
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      paddingTop: "10px",
                    }}>
                    {`Version: ${mangaInformation.version}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                item
                container>
                <Grid xs={1}>
                  <AutoModeRoundedIcon style={{ paddingTop: "10px" }} />
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      paddingTop: "10px",
                    }}>{`Status: ${mangaInformation.status}`}</Typography>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                item
                container>
                <Grid xs={1}>
                  <CalendarMonthRoundedIcon style={{ paddingTop: "10px" }} />
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      paddingTop: "10px",
                    }}>{`Year: ${mangaInformation.year}`}</Typography>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                item
                container>
                <Grid xs={1}>
                  <FormatListBulletedRoundedIcon
                    style={{ paddingTop: "10px" }}
                  />
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      paddingTop: "10px",
                    }}>{`Chapters: 6`}</Typography>
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
                  style={{ backgroundColor: "lightGrey" }}>
                  <Typography>Chapters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <li></li>
                  </Typography>
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
