import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import MangaApis from "../agent/api";
import MangaList from "../models/mangaList";

const T = () => {
  const [mangaList, setMangaList] = useState<MangaList[]>([]);
  const isRendered = useRef<boolean>(false);

  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
      MangaApis.getAllMangas().then((response) => {
        console.log(response.data);
        response.data.forEach((item: any) => {
          setMangaList((prev) => [
            ...prev,
            {
              mangaId: item.id,
              title: item.attributes.title["en"],
              description: "",
              year: item.attributes.year || 2023,
              status: item.attributes.status,
              author: "",
              version: item.attributes.version,
            },
          ]);
        });
      });
    }
  }, []);

  const getMangoDetails = (mangaId: string) => {
    MangaApis.getMangaDetails(mangaId).then((response) => {
      console.log("Details: ", response.data);
    });
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
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component='img'
                height='80'
                image=''
                alt=''
              />
              <CardContent>
                <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                  }}>{`Year: ${item.year} | Ver: ${
                  item.version
                } | Status: ${item.status.toUpperCase()}`}</Typography>
                <Typography sx={{ fontSize: 8 }}>
                  MANGA DESCRIPTION WILL BE RETRIVED HERE ...
                </Typography>
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
