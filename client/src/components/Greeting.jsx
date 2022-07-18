import React from "react";

export const Greeting = ({umer}) => {
    const [names, setNames] = React.useState([])
    // if(!umer.length){
        console.log("warr")
    //     return null;
    // }

    React.useEffect(()=>{
        console.log("cccc")
        setNames(umer());
    },[umer])


    return  names.map((s)=><p>{s}</p>)
}
