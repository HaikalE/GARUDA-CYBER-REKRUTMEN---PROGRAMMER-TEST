import React, {useRef,useState,useEffect} from "react";

import { Img, Input, Text } from "components";
import Modal from "react-modal"; 
import Button from "components/Button";
import ReactDOM from "react-dom";
const GenerateInvoicePage: React.FC<{
  total: number;
  discount: number;
  subTotal: number;
  products: { name: string; quantity: number }[];
  productPrices: Record<string, number>;
  businessName: string;
  businessLogo: string | null;
}> = ({
  total,
  discount,
  subTotal,
  products,
  productPrices,
  businessName,
  businessLogo,
}) => {
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  useEffect(() => {
    if (subTotal > 2000000 && !discountCode) {
      // Automatically generate and post the voucher code
      const generatedCode = generateRandomCode(6);
      setDiscountCode(generatedCode);
      handlePostVoucher(generatedCode);
    }
  }, [subTotal, discountCode]);
  const handlePostVoucher = async (code: string) => {
    try {
      const response = await fetch('http://localhost:5000/create-voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code
        }),
      });

      if (response.ok) {
        console.log('Voucher code posted successfully');
      } else {
        console.error('Failed to post voucher code');
      }
    } catch (error) {
      console.error('Error while posting voucher code', error);
    }
  };
  const showDiscountExplanation = subTotal > 2000000;
  const generateRandomCode = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  // Example: Generate a random discount code of length 8
  

  return (
    <div className="bg-white-A700 flex flex-col items-center justify-start md:ml-[0] ml-[5px] mt-[23px] p-[5px] rounded-[15px] shadow-bs1 w-full">
      <div className="flex flex-col items-center justify-start mt-[9px] w-[99%] md:w-full">
        <div className="flex flex-col gap-4 items-start justify-start w-full">
          <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
            <Text
              className="text-[15px] text-black-900"
              size="txtRobotoRomanMedium15"
            >
              BUSINESS NAME: {businessName}
            </Text>
            <div>
              <Text
                className="text-[15px] text-green-900_7e"
                size="txtRobotoRomanMedium15Green9007e"
              >
                BUSINESS LOGO
              </Text>
              {businessLogo && (
                <Img
                  className="h-[40px] w-[40px] rounded-full"
                  src={businessLogo}
                  alt="Business Logo"
                />
              )}
            </div>
          </div>
          <table className="w-full">
            {/* ... (rest of the code) */}
          </table>
          <div className="flex flex-row sm:gap-10 items-start justify-between w-full mt-3">
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Total
            </Text>
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Rp {total.toLocaleString()}
            </Text>
          </div>
          <div className="flex flex-row sm:gap-10 items-start justify-between mt-1.5 w-full">
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Discount
            </Text>
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Rp {discount.toLocaleString()}
            </Text>
          </div>
          {showDiscountExplanation && (
            <>
              <div className="flex flex-row sm:gap-10 items-start justify-between mt-1.5 w-full">
                <Text
                  className="text-[13px] text-black-900"
                  size="txtRobotoRomanRegular13"
                >
                  Discount Code
                </Text>
                <Text
                  className="text-[13px] text-black-900"
                  size="txtRobotoRomanRegular13"
                >
                  {discountCode}
                </Text>
              </div>
              <div className="flex flex-row sm:gap-10 items-start justify-between mt-1.5 w-full">
                <Text
                  className="text-[13px] text-black-900"
                  size="txtRobotoRomanRegular13"
                >
                  Discount Explanation
                </Text>
                <Text
                  className="text-[13px] text-black-900"
                  size="txtRobotoRomanRegular13"
                >
                  Discount Rp 10,000 expired in next 3 month
                </Text>
              </div>
            </>
          )}
          <div className="flex flex-row sm:gap-10 items-start justify-between md:ml-[0] ml-[3px] mt-[5px] w-full">
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Sub Total
            </Text>
            <Text
              className="text-[13px] text-black-900"
              size="txtRobotoRomanRegular13"
            >
              Rp {subTotal.toLocaleString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

const AndroidLargeOnePage: React.FC = () => {
  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [businessName, setBusinessName] = useState<string>("");
  const [isDiscountCodeValid, setIsDiscountCodeValid] = useState<boolean>();
  const [isBusinessNameValid, setIsBusinessNameValid] = useState<boolean>(false);
  const handleDiscountCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(event.target.value);
  };
  const handleBusinessNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setBusinessName(name);
    setIsBusinessNameValid(name.trim() !== ""); // Check if the business name is not empty
  };
  const handleGenerateInvoice = () => {
    if (!isBusinessNameValid) {
      alert("Please fill in the business name before generating the invoice.");
      return;
    }
    if (!selectedImage) {
      alert("Please select a business logo before generating the invoice.");
      return;
    }
    if (selectedProducts.length === 0) {
      alert("Please select at least one product before generating the invoice.");
      return;
    }
    const invoiceData = {
      total: calculateTotal(),
      discount: calculateDiscount(),
      subTotal: calculateSubTotal(),
      products: selectedProducts,
      productPrices: productPrices,
      businessName: businessName,
      businessLogo: selectedImage, // Assuming selectedImage is your business logo
    };
  
    ReactDOM.render(
      <GenerateInvoicePage {...invoiceData} />,
      document.getElementById("root")
    );
  };
  
  
  const applyDiscount = async () => {
    try {
      console.log(`Checking voucher validity for code: ${discountCode}`);
  
      // Make a GET request to the server to check the validity of the discount code
      const response = await fetch(`http://localhost:5000/get-voucher/${discountCode}`);
      
      if (response.ok) {
        // If the response is successful, parse the JSON data
        const voucherData = await response.json();
        if (voucherData.is_used) {
          // If the voucher is already used, set discount to 0 and mark the code as invalid
          setAppliedDiscount(0);
          setIsDiscountCodeValid(false);
  
          console.log('Discount code is already used.');
        } else {
          // Make a PUT request to mark the voucher as used
          await fetch(`http://localhost:5000/update-voucher/${discountCode}`, {
            method: 'PUT',
          });
  
          // Implement your discount logic here based on the voucher data
          // For example, you can check if the voucher is valid and set the applied discount accordingly.
          // Here, I'm assuming a simple case where the voucher has a fixed discount amount.
          const voucherDiscount = 10000 || 0; // Assuming 'amount' represents the discount value
  
          setAppliedDiscount(voucherDiscount);
          setIsDiscountCodeValid(true);
  
          console.log(`Applied discount: ${voucherDiscount}`);
        }
      } else {
        // If the response is not successful, set discount to 0 and mark the code as invalid
        setAppliedDiscount(0);
        setIsDiscountCodeValid(false);
  
        console.log('Discount code is invalid.');
      }
    } catch (error) {
      console.error('Error during voucher check:', error);
  
      // Handle errors (e.g., network issues, server errors)
      setAppliedDiscount(0);
      setIsDiscountCodeValid(false);
    }
  };
  
  
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [isProductModalVisible, setProductModalVisibility] = useState(false);
  
  const [productPrices, setProductPrices] = useState<Record<string, number>>({
    "Sofa Set (3-seater)": 5000000,
    "Dining Table with Chairs (6-seater)": 4500000,
    "Bed Frame (Queen Size)": 3200000,
    "Wardrobe (3 doors)": 2800000,
    "Coffee Table": 1500000,
    "Bookshelf": 1000000,
    "TV Stand": 800000,
    "Dresser with Mirror": 2000000,
    "Recliner Chair": 1700000,
    "Office Desk": 1200000,
    "Nightstand": 500000,
    "Bar Stools (Set of 2)": 1300000,
    "Outdoor Patio Set (Table + Chairs)": 3800000,
    "Corner Sofa": 6000000,
    "Shoe Rack": 700000,
    "Kids' Study Desk": 900000,
    "Foldable Dining Table (4-seater)": 2000000,
    "Armchair": 1300000,
    "Buffet Cabinet": 2500000,
    "Floating Wall Shelves (Set of 3)": 600000,
  });
  
  const handleBusinessLogoClick = () => {
    // Trigger the file input when "TAP TO CHANGE" is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleTapToAddClick = () => {
    setProductModalVisibility(true);
  };
  const handleAddProduct = (productName: string) => {
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { name: productName, quantity: 1 },
    ]);
    setProductSelection({
      ...productSelection,
      [productName]: true,
    });
  };
  const handleRemoveProduct = (productName: string) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.name !== productName)
    );
    setProductSelection({
      ...productSelection,
      [productName]: false,
    });
  };

  const handleQuantityChange = (productName: string, quantity: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productName ? { ...product, quantity } : product
      )
    );
  };
  
  const handleModalClose = () => {
    setProductModalVisibility(false);
  };
  const [productSelection, setProductSelection] = useState<Record<string, boolean>>(
    Object.keys(productPrices).reduce((acc, productName) => {
      acc[productName] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Handle the selected file (e.g., update the business logo)
      console.log("Selected file:", selectedFile);

      // Convert the selected file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const price = productPrices[product.name];
      const quantity = product.quantity;
      return total + price * quantity;
    }, 0);
  };
  
  const calculateSubTotal = () => {
    return calculateTotal()-calculateDiscount();//calculateTotal()-calculateDiscount()
  };
  
  const calculateDiscount = () => {
    // Consider the applied discount in the total calculation
    return appliedDiscount;
  };
  return (
    <>
      <div className="bg-yellow-A100 w-screen">
      <div className="flex items-center justify-center h-12 text-white">
      <Text
                      className="capitalize text-teal-200 tracking-[-0.44px] text-[22px] sm:text-lg md:text-xl"
                      size="txtMontserratRomanBold22"
                    >
                      RECEIPTSNAP
                    </Text>
        </div>
        <div className="flex flex-col gap-2.5 items-center justify-start max-w-[962px] mb-[7px] mx-auto md:px-5 w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="md:h-[172px] h-[270px] relative w-full">
              <div className="absolute bg-white-A700 bottom-[0] flex flex-row inset-x-[0] items-center justify-start mx-auto p-2.5 rounded-[15px] shadow-bs w-full">
                
                <div className="flex flex-row sm:gap-10 items-center justify-between mb-[129px] mt-1 w-full">
                  <Text
                    className="text-[15px] text-black-900"
                    size="txtRobotoRomanMedium15"
                  >
                    BUSINESS LOGO*
                  </Text>
                  <div
              onClick={handleBusinessLogoClick}
              style={{ cursor: "pointer" }}
            >
              <Text
                className="text-[15px] text-green-900_7e"
                size="txtRobotoRomanMedium15Green9007e"
              >
                TAP TO CHANGE
              </Text>
            </div>
                </div>
              </div>
              <Img
            className="absolute bottom-[9%] h-[95px] left-[0] object-cover w-[95px]"
            src={selectedImage || "images/img_image2.png"}
            alt="imageTwo"
            style={{ marginLeft: "20px" }} 
          />
              
            </div>
            <div className="bg-white-A700 flex flex-col items-center justify-start md:ml-[0] ml-[5px] mt-[19px] p-2.5 rounded-[15px] shadow-bs1 w-full">
              <div className="flex flex-col items-center justify-start my-1 w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                    <Text
                      className="text-[15px] text-black-900"
                      size="txtRobotoRomanMedium15"
                    >
                      BUSINESS NAME*
                    </Text>
                  </div>
                  <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
                  <input
  type="text"
  className="ml-0.5 md:ml-[0] text-[13px] text-black-900"
  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: 'normal' }}
  placeholder="Business Name"
  onChange={handleBusinessNameChange}
/>

                </div>
              </div>
            </div>
            <div className="bg-white-A700 flex flex-col items-center justify-end md:ml-[0] ml-[5px] mt-[23px] p-[5px] rounded-[15px] shadow-bs1 w-full">
            <div className="flex flex-col items-center justify-start mt-[9px] w-[99%] md:w-full">
            <div className="flex flex-col gap-4 items-center justify-start w-full">
  <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
    <Text
      className="text-[15px] text-black-900"
      size="txtRobotoRomanMedium15"
    >
      PRODUCTS*
    </Text>
    <Text
      className="text-[15px] text-green-900_7e cursor-pointer"
      size="txtRobotoRomanMedium15Green9007e"
      onClick={handleTapToAddClick}
    >
      TAP TO ADD
    </Text>
  </div>
  {selectedProducts.length > 0 && (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-center">Product</th>
          <th className="text-center">Price</th>
          <th className="text-center">Action</th>
          <th className="text-center">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {selectedProducts.map((selectedProduct, index) => (
          <tr key={index}>
            <td className="text-center">
              <Text
                className="text-[13px] text-black-900"
                size="txtRobotoRomanRegular13"
              >
                {selectedProduct.name}
              </Text>
            </td>
            <td className="text-center">
              <Text
                className="text-[13px] text-gray-500"
                size="txtRobotoRomanRegular13"
              >
                Rp {productPrices[selectedProduct.name].toLocaleString()}
              </Text>
            </td>
            <td className="text-center">
              <button
                onClick={() => handleRemoveProduct(selectedProduct.name)}
                className="text-red-500"
              >
                Remove
              </button>
            </td>
            <td className="text-center">
              <select
                value={selectedProduct.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    selectedProduct.name,
                    parseInt(e.target.value)
                  )
                }
                className="border rounded-md p-1"
              >
                {[1, 2, 3, 4, 5].map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        </div>
      </div>
            
            <div className="font-montserrat mt-6 w-full flex items-center">
            <input
  type="text"
  value={discountCode}
  onChange={handleDiscountCodeChange}
  placeholder="Discount code"
  className={`leading-normal p-2 w-full border ${
    isDiscountCodeValid === true ? "border-green-500" : 
    isDiscountCodeValid === false ? "border-red-500" : "border-blue_gray-100"
  } rounded-md`}
/>

              <div className="mt-2">
            <button
              onClick={applyDiscount}
              className="bg-teal-500 text-white-A700 font-semibold px-4 py-2 rounded-md ml-2"
            >
              Apply
            </button>
          </div>
            </div>
            {isDiscountCodeValid !== undefined && (
  <Text
    className={`ml-1.5 md:ml-[0] mt-[15px] text-[13px] text-black-900 ${
      isDiscountCodeValid ? "text-green-500" : "text-red-500"
    }`}
    size="txtRobotoRomanRegular13"
  >
    {isDiscountCodeValid ? "Success" : "Invalid Code"}
  </Text>
)}

            <div className="bg-white-A700 flex flex-col font-roboto items-center justify-start md:ml-[0] ml-[5px] mt-[18px] p-[9px] rounded-[15px] shadow-bs1 w-full">
  <div className="flex flex-col items-center justify-start my-[5px] w-full">
    <div className="flex flex-col items-start justify-start w-full">
      <Text
        className="text-[15px] text-black-900"
        size="txtRobotoRomanMedium15"
      >
        SUMMARY
      </Text>
      <div className="flex flex-row sm:gap-10 items-start justify-between ml-0.5 md:ml-[0] mt-[13px] w-full">
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Total
        </Text>
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Rp {calculateTotal().toLocaleString()}
        </Text>
      </div>
      <div className="flex flex-row sm:gap-10 items-start justify-between md:ml-[0] ml-[3px] mt-[5px] w-full">
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Discount
        </Text>
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Rp {calculateDiscount().toLocaleString()}
        </Text>
      </div>
      <div className="flex flex-row sm:gap-10 items-start justify-between mt-1.5 w-full">
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Sub Total
        </Text>
        <Text
          className="text-[13px] text-black-900"
          size="txtRobotoRomanRegular13"
        >
          Rp {calculateSubTotal().toLocaleString()}
        </Text>
      </div>
    </div>
  </div>
</div>
          </div>
          <div className="font-poppins h-[43px] sm:pl-5 pl-[37px] relative w-full">
            <button
        onClick={handleGenerateInvoice}
        className="bg-teal-200 h-[43px] m-auto rounded-[7px] w-[97%]"
      >
        <Text
          className="absolute h-max inset-[0] justify-center m-auto text-[15px] text-center text-white-A700 w-max"
          size="txtPoppinsBold15"
        >
          GENERATE INVOICE
        </Text>
      </button>
          </div>
        </div>
      </div>
      <Modal
  isOpen={isProductModalVisible}
  onRequestClose={handleModalClose}
  contentLabel="Select Products"
>
  <h2>Select Products</h2>
  <ul>
    {Object.entries(productPrices).map(([productName, price]) => (
      <li key={productName}>
        <div className="product-list-item">
          <Button
            onClick={() => handleAddProduct(productName)}
            disabled={productSelection[productName]}
          >
            {productName} - Rp {price.toLocaleString()}
          </Button>
          <button
            className="add-button"
            onClick={() => handleAddProduct(productName)}
            disabled={productSelection[productName]}
          >
            Add
          </button>
        </div>
      </li>
    ))}
  </ul>
  <div>
  
</div>
</Modal>

    </>
  );
};

export default AndroidLargeOnePage;

