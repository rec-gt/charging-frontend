import { Box, Button, Link, Stack } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  CountdownButton,
  FormContainer,
  FormName,
  FormRow,
  HFlex,
  InputField,
  InputFieldWithEye,
} from "../../components";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { USER_ROLE } from "../../config";
import { setPageAlert } from "../../state/pageAlertSlice";
import { deleteJwtToken, navTo, postReq2 } from "../../utils";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(6)
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username must start with a letter and can only contain letters and numbers"
    )
    .required("Username is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long"
    )
    .required("Password is required"),
  passwordAgain: yup
    .string()
    .test("required", "Two passwords are different", (value, context) => {
      const {
        parent: { password },
      } = context;
      return password === value;
    }),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  verificationCode: yup
    .string()
    .required("Email Verification Code is required"),
});

export const RegisterAdmin: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordAgain: "",
      showPassword: false,
      email: "",
      role: USER_ROLE.MERCHANT,
      verificationId: "",
      verificationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleRegisterAdmin(values);
    },
  });

  const handleSendCode = async (): Promise<void> => {
    await postReq2(
      {
        path: "/email/send/verify-email",
        data: {
          email: formik.values.email,
        },
      },
      dispatch
    ).then(async (res) => {
      if (res.data) {
        const { verificationId } = res.data;
        await formik.setFieldValue("verificationId", verificationId);
        dispatch(
          setPageAlert({
            severity: "success",
            text: "Email Verification Code is sent",
          })
        );
      }
    });
  };

  const handleSelectRole = async (role: USER_ROLE) => {
    await formik.setFieldValue("role", role);
  };

  const handleRegisterAdmin = async (values: any): Promise<void> => {
    const {
      username,
      password,
      email,
      role,
      verificationId,
      verificationCode,
    } = values;

    await postReq2(
      {
        path: "/user/create-v",
        data: {
          username,
          password,
          email,
          role,
          verificationId,
          verificationCode,
        },
      },
      dispatch
    ).then((res) => {
      if (res.data) {
        deleteJwtToken();
        navTo("/auth/login");
      }
    });
  };

  return (
    <PageLayout>
      <Box width={"100%"} maxWidth={"500px"}>
        <FormContainer>
          <FormRow>
            <Stack spacing={3} width={"100%"}>
              <FormName>REGISTER</FormName>
              <InputField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                eyeOnClick={async () => {
                  await formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  );
                }}
                eyeToggle={formik.values.showPassword}
              />

              <InputFieldWithEye
                fullWidth
                id="passwordAgain"
                name="passwordAgain"
                label="Please enter password again"
                type={formik.values.showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formik.values.passwordAgain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordAgain &&
                  Boolean(formik.errors.passwordAgain)
                }
                helperText={
                  formik.touched.passwordAgain && formik.errors.passwordAgain
                }
                eyeOnClick={async () => {
                  await formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  );
                }}
                eyeToggle={formik.values.showPassword}
              />

              <InputField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <HFlex
                spacing={2}
                alignItems={
                  formik.touched.verificationCode &&
                  Boolean(formik.errors.verificationCode)
                    ? "flex-start"
                    : "center"
                }
              >
                <InputField
                  fullWidth
                  id="verificationCode"
                  name="verificationCode"
                  label="Email Verification Code"
                  type="verificationCode"
                  value={formik.values.verificationCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.verificationCode &&
                    Boolean(formik.errors.verificationCode)
                  }
                  helperText={
                    formik.touched.verificationCode &&
                    formik.errors.verificationCode
                  }
                />
                <CountdownButton fn={handleSendCode}>SEND</CountdownButton>
              </HFlex>

              {true && (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Button
                    fullWidth
                    variant={
                      formik.values.role === USER_ROLE.PLAYER
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => {
                      handleSelectRole(USER_ROLE.PLAYER);
                    }}
                  >
                    PLAYER
                  </Button>
                  <Button
                    fullWidth
                    variant={
                      formik.values.role === USER_ROLE.MERCHANT
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => {
                      handleSelectRole(USER_ROLE.MERCHANT);
                    }}
                  >
                    MERCHANT
                  </Button>
                </Stack>
              )}

              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                REGISTER
              </Button>
              <Link align="center" href="/auth/login" color="inherit">
                ALREADY HAVE AN ACCOUNT?
                <br />
                LOGIN NOW
              </Link>
            </Stack>
          </FormRow>
        </FormContainer>
      </Box>
    </PageLayout>
  );
};
