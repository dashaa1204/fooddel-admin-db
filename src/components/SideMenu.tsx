import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import TabPanel from "./TabPanel";
import SaleCard from "./SaleCard";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type CategoryDataType = { name: string }[];
type FoodDataType = {
  name: string;
  category: string;
  img: string;
  ingredients: string;
  price: number;
  sale: number;
}[];

const SideMenu = () => {
  const [value, setValue] = useState(0);
  const [categoryData, setCategoryData] = useState<CategoryDataType>();
  const [open, setOpen] = useState<boolean>(false);
  const [foodData, setFoodData] = useState<FoodDataType>();

  console.log(foodData);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3001/api/category");
      const dataCategory = await res.json();
      setCategoryData(dataCategory.categories);
      const res2 = await fetch("http://localhost:3001/api/food");
      const food = await res2.json();
      setFoodData(food.foods);
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
          {categoryData?.map((a, index) => {
            return <Tab label={a.name} {...a11yProps(index)} key={index} />;
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
        <Stack direction={"row"}>
          {foodData?.map((a, index) => {
            return (
              <TabPanel value={value} index={index} key={index}>
                <SaleCard foodData={a} />
              </TabPanel>
            );
          })}
        </Stack>
      </Stack>
      <AddCategoryModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SideMenu;
