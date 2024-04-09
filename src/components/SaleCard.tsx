import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState, Dispatch } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type dataType = {
  name: string;
  img: string;
  price: number;
  sale: number;
  ingredients: string;
  category: string;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix="₮"
      />
    );
  }
);

const SaleCard = ({ foodData }: { foodData: dataType }) => {
  const [values, setValues] = useState({
    numberformat: foodData.price - (foodData.sale * foodData.price) / 100,
  });
  const [mainValues] = useState({
    numberformat: foodData.price,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <Stack>
      <Stack
        gap={6}
        margin={0}
        sx={{ marginLeft: 2 }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Stack position={"relative"}>
          <Box
            component={"img"}
            src={foodData.img}
            width={"282px"}
            height={"186px"}
            borderRadius={"16px"}
          ></Box>
          {foodData.sale > 0 && (
            <Stack
              px={4}
              py={1}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              border={1}
              borderColor={"white"}
              bgcolor={"#18BA51"}
              borderRadius={"16px"}
              position={"absolute"}
              top={10}
              right={10}
            >
              <Typography fontSize={"18px"} fontWeight={"600"} color={"white"}>
                {foodData.sale}%
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack width={"282px"} gap={"2px"}>
          <Typography fontSize={"18px"} fontWeight={600}>
            {foodData.name}
          </Typography>
          <Stack direction={"row"} gap={2}>
            <TextField
              value={values.numberformat}
              onChange={handleChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom as any,
                disableUnderline: true,
                style: { color: "#18BA51", fontSize: "18px", fontWeight: 600 },
              }}
              variant="standard"
            />
            {foodData.sale > 0 && (
              <TextField
                value={mainValues.numberformat}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                  disableUnderline: true,
                  style: {
                    fontSize: "18px",
                    fontWeight: 400,
                    textDecoration: "line-through",
                  },
                }}
                variant="standard"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SaleCard;
