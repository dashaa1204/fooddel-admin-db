import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type dataType = { name: string }[];

const SideMenu = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState<dataType>();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3001/api/category");
      const dataCategory = await res.json();
      setData(dataCategory.categories);
    }
    getData();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "1228px",
        pl: "120px",
        py: "26px",
        pr: "24px",
      }}
    >
      <Stack gap={"40px"}>
        <Typography>Food Menu</Typography>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {data?.map((a, index) => {
            return <Tab label={a.name} key={index} />;
          })}
        </Tabs>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add new category
        </Button>
      </Stack>
      <Stack py={"24px"} gap={"32px"}>
        <Stack
          direction={"row"}
          width={"894px"}
          py={"16px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>title</Typography>
          <Button>Add new food</Button>
        </Stack>
        {/* {data?.map((a) => {
          return (
            <TabPanel
              key={a.index}
              value={value}
              index={a.index}
              text={a.name}
            ></TabPanel>
          );
        })} */}
      </Stack>
      <AddCategoryModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SideMenu;
