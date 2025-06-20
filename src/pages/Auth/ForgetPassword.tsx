import { Box, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  CountdownButton,
  FormContainer,
  FormName,
  HFlex,
  InputField,
  InputFieldWithEye
} from "../../components";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { setPageAlert } from "../../state/pageAlertSlice";
import { postReq2 } from "../../utils";

export const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      verificationId: "",
      verificationCode: "",
      newPassword: "",
      newPasswordAgain: "",
      showNewPassword: false,
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      verificationCode: yup
        .string()
        .required("Reset password code is required"),
      newPassword: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long"
        )
        .required("Password is required"),
      newPasswordAgain: yup
        .string()
        .test("required", "Two passwords are different", (value, context) => {
          const {
            parent: { newPassword },
          } = context;
          return newPassword === value;
        }),
    }),
    onSubmit: async (values) => {
      await handleResetPassword(values);
    },
  });

  const handleResetPassword = async (values: any) => {
    const { username, verificationId, verificationCode, newPassword } = values;
    await postReq2(
      {
        path: "/user/reset-password",
        data: {
          username,
          verificationId,
          verificationCode,
          newPassword,
        },
      },
      dispatch
    ).then(async (res) => {
      if (res.data) {
        dispatch(
          setPageAlert({
            severity: "success",
            text: "Successully reset password",
          })
        );
      }
    });
  };

  const handleSendCode = async (): Promise<void> => {
    await postReq2(
      {
        path: "/email/send/reset-password",
        data: {
          username: formik.values.username,
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
            text: "One-time Reset Password Code is sent",
          })
        );
      }
    });
  };

  return (
    <PageLayout>
      <Box width={"100%"} maxWidth={"500px"}>
        <FormContainer>
          <Stack spacing={3} width={"100%"}>
            <FormName>RESET PASSWORD</FormName>
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
                label="One-time Reset Password Code"
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

            <InputFieldWithEye
              fullWidth
              id="newPassword"
              name="newPassword"
              label="New Password"
              type={formik.values.showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              eyeOnClick={async () => {
                await formik.setFieldValue(
                  "showNewPassword",
                  !formik.values.showNewPassword
                );
              }}
              eyeToggle={formik.values.showNewPassword}
            />

            <InputFieldWithEye
              fullWidth
              id="newPasswordAgain"
              name="newPasswordAgain"
              label="Enter New Password Again"
              type={formik.values.showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formik.values.newPasswordAgain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPasswordAgain &&
                Boolean(formik.errors.newPasswordAgain)
              }
              helperText={
                formik.touched.newPasswordAgain &&
                formik.errors.newPasswordAgain
              }
              eyeOnClick={async () => {
                await formik.setFieldValue(
                  "showNewPassword",
                  !formik.values.showNewPassword
                );
              }}
              eyeToggle={formik.values.showNewPassword}
            />

            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              RESET PASSWORD
            </Button>
          </Stack>
        </FormContainer>
      </Box>
    </PageLayout>
  );
};
