import { Typography } from "@mui/material";
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
  const mangaId: string = String(window.location.search.substring(1));

  useEffect(() => {
    console.log("Check: ", mangaId);
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

  return (
    <div style={{ padding: "30px" }}>
      <Grid
        container
        xs={12}
        item>
        {mangaInformation && (
          <Grid xs={3}>
            <img
              src={`https://uploads.mangadex.org/covers/${mangaInformation.mangaId}/${mangaInformation.fileName}`}
              alt='Girl in a jacket'
              width='200'
              height='300'
            />
            <Typography style={{ paddingTop: "30px" }}>
              {`Title: ${mangaInformation.title}`}
            </Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Author: ${mangaInformation?.author}`}</Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Title: ${mangaInformation.title}`}</Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Description: ${mangaInformation.description}`}</Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Version: ${mangaInformation.version}`}</Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Status: ${mangaInformation.status}`}</Typography>
            <Typography
              style={{
                paddingTop: "10px",
              }}>{`Year: ${mangaInformation.year}`}</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MangaDetails;
