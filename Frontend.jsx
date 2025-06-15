const handlePurchase = async (website: any) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/create-checkout-session",
      {
        image: website.image,
        title: website.title,
        price: website.price,
      }
    );
    window.location.href = res.data.url;
  } catch (err) {
    console.error(err);
    alert("Payment initiation failed.");
  }
};
