import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  Link,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import {
  FormContainer,
  FormName,
  InputField,
  InputFieldWithEye
} from "../../components";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { setPageAlert } from "../../state/pageAlertSlice";
import { deleteJwtToken, navTo, postReq2, storeJwtToken } from "../../utils";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const callback = searchParams.get("cb");
  const tournamentId = searchParams.get("tid");
  const alertMsg = searchParams.get("a");

  useEffect(() => {
    if (alertMsg === "required") {
      dispatch(
        setPageAlert({
          severity: "warning",
          text: "Login Required",
        })
      );
    }
  }, [alertMsg]);

  const handleLogin = async (values: any): Promise<void> => {
    const { username, password, keepSignIn } = values;

    deleteJwtToken();

    await postReq2(
      {
        path: "/auth/login",
        data: {
          username,
          password,
        },
      },
      dispatch
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        storeJwtToken(data.jwtToken, keepSignIn);
        if (callback === "view") {
          navTo(`/tournament/${tournamentId}`);
        } else {
          navTo("/main");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      showPassword: false,
      keepSignIn: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleLogin(values);
    },
  });

  return (
    <PageLayout>
      <Box width={"100%"} maxWidth={"500px"}>
        <FormContainer>
          <Stack spacing={3} width={"100%"}>
            <FormName>LOGIN</FormName>
            <InputField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <InputFieldWithEye
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={formik.values.showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              eyeOnClick={async () => {
                await formik.setFieldValue(
                  "showPassword",
                  !formik.values.showPassword
                );
              }}
              eyeToggle={formik.values.showPassword}
            />

            <Grid2 container justifyContent="flex-end">
              <Link
                fontSize={14}
                align={"right"}
                href="/auth/forget-password"
                color="inherit"
              >
                FORGOT PASSWORD?
              </Link>
            </Grid2>

            <FormGroup sx={{ width: "max-content" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="keepSignIn"
                    value={formik.values.keepSignIn}
                    onChange={formik.handleChange}
                  />
                }
                label="Keep me sign in"
              />
            </FormGroup>

            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              LOGIN
            </Button>
            <Link align="center" href="/auth/register" color="inherit">
              DO NOT HAVE AN ACCOUNT?
              <br />
              REGISTER NOW
            </Link>
          </Stack>
        </FormContainer>
      </Box>
    </PageLayout>
  );
};
