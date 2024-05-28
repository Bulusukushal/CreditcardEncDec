import React ,{useState} from 'react';

function CryptoInpt(){
    const [showDec,setShowDec]=useState(false);
    const [showMsg,setShowMsg]=useState(false);
    function handleEnc(){
        const ccnum=document.getElementById('msg').value;
        if(ccnum.length!==16){
            alert('CreditCard number must contain 16 digits')
        }
        else{const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'message':document.getElementById('msg').value})
        };
        console.log('requestOptions',requestOptions);
        fetch('/api/encrypt', requestOptions)
            .then(response => response.json())
            .then(data =>{
                setShowDec(true);  
                console.log(JSON.stringify(data));
                document.getElementById('encrypt').innerHTML=data.message});
        }
    }
    function handleDec(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'message':document.getElementById('encrypt').innerHTML})
        };
        console.log('requestOptions',requestOptions);
        fetch('/api/decrypt', requestOptions)
            .then(response => response.json())
            .then(data =>{  
                setShowMsg(true);
                console.log(JSON.stringify(data));
                document.getElementById('decrypt').innerHTML=data.message});
    }
    return(
        <div>
            <label for="msg">Enter your Credit Card Number </label> <br></br>
            <input type='text' id='msg' /> <br></br>
            <button onClick={handleEnc}>Encrypt</button>
           
            <h2>Encrypted text</h2>
            <div id='encrypt'></div>  <br></br> 
            {showDec &&
            <div><button onClick={handleDec}>Decrypt</button>  <br></br></div>
             
            }
            {showMsg && <div><h2>Decrypted text</h2></div>}
            <div id='decrypt'></div>
            
        </div>
    )
}

export default CryptoInpt;