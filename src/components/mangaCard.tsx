import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaApis from "../agent/api";
import MangaList from "../models/mangaList";
import appPaths from "../shared/paths";

//coverArt: item.relationships.attributes.fileName,

const T = () => {
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState<MangaList[]>([]);
  const isRendered = useRef<boolean>(false);

  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
      MangaApis.getAllMangas().then((response) => {
        response.data.forEach((item: any) => {
          let name = "";
          let author = "";
          item.relationships.forEach((i: any) => {
            if (i.type === "cover_art") {
              name = i.attributes.fileName;
            }

            if (i.type === "author") {
              author = i.attributes.name;
            }
          });

          setMangaList((prev) => [
            ...prev,
            {
              mangaId: item.id,
              title: item.attributes.title["en"],
              description: item.attributes.description["en"],
              year: item.attributes.year || 2023,
              status: item.attributes.status,
              author: author,
              version: item.attributes.version,
              fileName: name,
            },
          ]);
        });
      });
    }
  }, []);

  const getMangoDetails = (mangaId: string) => {
    // MangaApis.getMangaDetails(mangaId).then((response) => {
    //   //console.log("Details: ", response.data);
    // });

    //ToDo =>

    navigate(`${appPaths.details}?${mangaId}`);
  };

  // subheader={`Year: ${item.year} | Ver: ${item.version} | Status: ${item.status}`}
  return (
    <div style={{ padding: "30px" }}>
      <Grid
        container
        spacing={1}
        xs={12}
        item>
        {mangaList.map((item) => (
          <Grid
            item
            xs={2}
            key={item.mangaId}>
            <Card sx={{ height: "100%", width: "80%" }}>
              <CardMedia
                component='img'
                height={100}
                image={`https://uploads.mangadex.org/covers/${item.mangaId}/${item.fileName}`}
                alt=''
              />
              <CardContent>
                <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                  }}>{`Author: ${item.author} | Year: ${item.year} | Ver: ${
                  item.version
                } | Status: ${item.status.toUpperCase()}`}</Typography>
                <Typography sx={{ fontSize: 8 }}>{`${
                  item.description
                    ? item.description.substring(0, 100) + "..."
                    : ""
                }`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  onClick={() => {
                    getMangoDetails(item.mangaId);
                  }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default T;
