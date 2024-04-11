import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FoodDataType, CategoryDataType } from "@/utils/GlobalTypes";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

export default function EditCategory({ data }: { data: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [id, setId] = React.useState();
  const open = Boolean(anchorEl);
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [data, setData] = React.useState();
  const deleteCategory = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.target._id;
    await fetch("http://localhost:3001/api/category", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => {
          handleClick(e);
          setId(data);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "226px",
          },
        }}
      >
        <Stack borderRadius={"4px"} bgcolor={"white"}>
          <Stack
            justifyContent={"center"}
            borderRadius={"8px"}
            component={"button"}
            sx={{ all: "initial" }}
          >
            <Stack px={"16px"} py={"8px"} gap={"16px"} direction={"row"}>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.5 6.50024L17.5 10.5002M4 20.0003H8L18.5 9.5003C19.0304 8.96987 19.3284 8.25045 19.3284 7.5003C19.3284 6.75016 19.0304 6.03074 18.5 5.5003C17.9696 4.96987 17.2501 4.67188 16.5 4.67188C15.7499 4.67187 15.0304 4.96987 14.5 5.5003L4 16.0003V20.0003Z"
                    stroke="#525252"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Stack>
                <Typography fontSize={"16px"}>Edit name</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            justifyContent={"center"}
            borderRadius={"8px"}
            component={"button"}
            sx={{ all: "initial" }}
            onClick={deleteCategory}
          >
            <Stack px={"16px"} py={"8px"} gap={"16px"} direction={"row"}>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                    stroke="#F5222D"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
              <Stack>
                <Typography color={"#DF1F29"} fontSize={"16px"}>
                  Delete Category
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Menu>
    </div>
  );
}
