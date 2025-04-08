import Cookies from "js-cookie";

async function handleRegister(values, setLoading) {
  setLoading(true);

  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("companyName", values.companyName);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("confirmPassword", values.rePassword);

  try {
    const response = await fetch(`${API_GATEWAY}/account/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(`Failed to register. Error: ${data.message || "Please try again."}`);
      return;
    }

    Cookies.set("token", data.token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    const createUserIdResponse = await fetch(`${API_GATEWAY}/social/createUserId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: data.userId }),
    });

    if (!createUserIdResponse.ok) {
      const err = await createUserIdResponse.json();
      toast.error(`User created but failed to create social id: ${err.message}`);
    } else {
      toast.success("Registration successful! 🎉");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred during registration.");
  } finally {
    setLoading(false);
  }
}
