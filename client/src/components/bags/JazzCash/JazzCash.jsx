import React, {useState} from "react";
import moment from "moment";
import cryptoJs from "crypto-js";

const JazzCash = () => {
    const IntegritySalt = "t0sx41a1z5";
    const handleSubmit = () => {
        let a = { ...data };
        a.pp_Amount = a.pp_Amount + "00";
        let hashString =
          IntegritySalt +
          "&" +
          a.pp_Amount +
          "&" +
          a.pp_BillReference +
          "&" +
          a.pp_Description +
          "&" +
          a.pp_Language +
          "&" +
          a.pp_MerchantID +
          "&" +
          a.pp_Password +
          "&" +
          a.pp_ReturnURL +
          "&" +
          a.pp_TxnCurrency +
          "&" +
          a.pp_TxnDateTime +
          "&" +
          a.pp_TxnExpiryDateTime +
          "&" +
          a.pp_TxnRefNo +
          "&" +
          a.pp_TxnType +
          "&" +
          a.pp_Version +
          "&" +
          a.ppmpf_1;
        let hash = cryptoJs.HmacSHA256(hashString, IntegritySalt).toString();
        a.pp_SecureHash = hash;
        console.log(a);
        // setModel(true);
        // dispatch(
        //   PAYMENT_WITH_API(User._id, a, () => {
        //     setModel(false);
        //     setData(initial);
        //     navigation.goBack();
        //   })
        // );
      };

    let initial = {
      pp_Version: "1.1",
      pp_TxnType: "MWALLET",
      pp_Language: "EN",
      pp_MerchantID: "MC19175",
      pp_Password: "s5u4x9811v",
      pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
      pp_Amount: "",
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
      pp_BillReference: "billRef",
      pp_Description: "Add Points to wallet",
      pp_TxnExpiryDateTime: moment()
        .add(1, "d")
        .format("YYYYMMDDHHmmss")
        .toString(),
      pp_ReturnURL:
        "https://fyp-admin-panel.herokuapp.com/api/wallet?id=" + "User._id",
      pp_SecureHash: "",
      ppmpf_1: "",
    };
  
    const [data, setData] = useState(initial);
    const [model, setModel] = useState(false);
    const [loading, setLoading] = useState(true);
    return (
        <>
        <img src="https://seeklogo.com/images/E/easypaisa-logo-477156A1F0-seeklogo.com.png"/>
      <input 
      type={"text"} 
      onChange={(e) => setData({ ...data, pp_Amount: e.target.value })}
      value={data.pp_Amount}
      
      />
      <input 
      type={"text"} 
      onChange={(text) => setData({ ...data, ppmpf_1: text.target.value })}
      value={data.ppmpf_1}
      />
      <button onClick={handleSubmit} >Submit</button>
      </>
    )

}
export default JazzCash;
