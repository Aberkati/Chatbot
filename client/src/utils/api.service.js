import axios from "axios";

export default async text => {
  try {
    const res = await axios.post("/api/df_text_query", { text });
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      user: "bot",
      message: res.data.fulfillmentText
    };
  } catch (err) {
    console.log(err);
    return {
      user: "bot",
      message: "Erreur"
    };
  }
};
