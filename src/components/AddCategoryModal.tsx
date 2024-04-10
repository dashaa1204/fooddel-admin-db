import {
  Button,
  Stack,
  Modal,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type dataType = { name: string }[];
type CategoryDataType = { name: string; _id: string; __v: number }[];

const AddCategoryModal = ({
  setOpen,
  open,
  categoryData,
  setCategoryData,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  categoryData: CategoryDataType;
  setCategoryData: Dispatch<SetStateAction<CategoryDataType>>;
}) => {
  const [empty, setEmpty] = useState("");
  const addCategory = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: e.target.name.value };
    await fetch("http://localhost:3001/api/category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
    setCategoryData([...categoryData, data]);
  };
  return (
    <Stack>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          width={"587px"}
          bgcolor={"#FFF"}
          position={"absolute" as "absolute"}
          top={"50%"}
          left={"50%"}
          p={4}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Stack
            py={"16px"}
            px={"24px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
          >
            <CloseIcon />
            <Typography>Create new category</Typography>
          </Stack>
          <form onSubmit={addCategory}>
            <Stack p={"24px"} justifyContent={"center"} gap={"16px"}>
              <Stack justifyContent={"center"} gap={"8px"}>
                <Typography></Typography>
                <TextField
                  id="filled-error-helper-text"
                  name="name"
                  placeholder="neree oruul"
                  helperText={empty}
                  variant="filled"
                  onChange={(e) => {
                    e.target.value !== ""
                      ? setEmpty("")
                      : setEmpty("empty entry");
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              p={"24px"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={"16px"}
              direction={"row"}
            >
              <Button>Clear</Button>
              <Button type="submit">Continue</Button>
            </Stack>
          </form>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default AddCategoryModal;
