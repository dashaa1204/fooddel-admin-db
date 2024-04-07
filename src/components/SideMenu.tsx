import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import TabPanel from "./TabPanel";
import { useEffect } from "react";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type dataType = { index: number; name: string }[];

const SideMenu = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState<dataType>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3001/api/category");
      const data = await res.json();
      setData(data);
    }
    getData();
  });

  const [open, setOpen] = React.useState(false);

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
          <Tab label="Break fast" {...a11yProps(0)} />
          <Tab label="Soup" {...a11yProps(1)} />
          <Tab label="Main course" {...a11yProps(2)} />
          <Tab label="Desserts" {...a11yProps(3)} />
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
          <Typography>"title"</Typography>
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
      <addCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SideMenu;
