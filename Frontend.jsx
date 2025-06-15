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


Example usage in a button:

<Button 
  onClick={() => handlePurchase(website)}
  className="w-full gradient-bg hover:opacity-90 transition-opacity"
>
  <ShoppingCart className="w-4 h-4 mr-2" />
  Purchase Now - ${website.price}
</Button>
