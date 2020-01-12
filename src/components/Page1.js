import React from 'react';
import styles from '../styles/Page1.module.css'
import crypto from 'crypto'
import axios from 'axios'
//import * as cryptojs from 'crypto-js/aes'
class Page1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {en:"",dn:"",msg:"",key:"",display:"",show:0,showdec:0}
        this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
        this.onEncryptHandler=this.onEncryptHandler.bind(this);
        this.onDecryptHandler=this.onDecryptHandler.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.recieveMessage=this.recieveMessage.bind(this);
    }

    componentDidMount(){
     
    }
    sendMessage(e)
    {
      //let tid=this.state.tid;
      //let sid=this.state.sid;
      let dis="";
      axios.post('http://localhost:3003/send',{data:this.state.en})
      .then(res=>{
        console.log(res);  
        dis=res;
        this.setState({display:dis.data},()=>{console.log(this.state.display)});

      })

      e.preventDefault();
      e.stopPropagation();

    }

    recieveMessage(e){
      let dis="";
      axios.get('http://localhost:3003/recieve')
      .then(res=>{
        console.log(res);  
        dis=res;
        this.setState({display:dis.data.text},()=>{console.log(this.state.display)});
        this.setState({msg:dis.data.ciph});
        document.getElementById("msg").value = dis.data.ciph;

      })

      e.preventDefault();
      e.stopPropagation();
    }
    onFormchangeHandler(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
            [name]:value
        },()=>{
            console.log(this.state);
        })
    }

    onEncryptHandler(e){
         console.log("handler called");
        console.log(this.state);
        let msg=this.state.msg;
        let key=this.state.key;

        const cipher=crypto.createCipher('aes192',key);
        let enc=cipher.update(msg,'utf8','hex');
        enc+=cipher.final('hex');


        this.setState({en:enc},()=>{
          //this.setState({msg:enc});
          console.log(this.state);
         // document.getElementById("msg").value = this.state.en;
        });

        this.setState({show:1,showdec:0});


        e.preventDefault();
        e.stopPropagation();
    }

    onDecryptHandler(e){
      let msg=this.state.msg.toString();
      console.log(msg);
      let key=this.state.key;
     

      const decipher = crypto.createDecipher('aes192', key);

  let decrypted = decipher.update(msg, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
        this.setState({dn:decrypted},()=>{console.log(decrypted);
        });
        this.setState({show:0,showdec:1});
     

        e.preventDefault();
        e.stopPropagation();
    }

    render(){

      let encrypted= "";
      if(this.state.show===1){
        encrypted=   <div> Your encrypted message is : {this.state.en}</div>
      }
      else{
        encrypted="";
      }

      let decrypted= "";
      if(this.state.showdec===1){
        decrypted=<div> Your decrypted message is : {this.state.dn}</div>
      }
      else{
        decrypted="";
      }

      
    return(
        
<div className={styles.container}>
  <form >
  <div className={styles.row}>
    <div >
      <label >Message</label>
    </div>
    <div >
      <input type="text" id="msg" name="msg" onChange={this.onFormchangeHandler} placeholder="Enter message"/>
    </div>
  </div>
  <div className={styles.row}>
    <div>
      <label>Key</label>
    </div>
    <div>
      <input type="password" id="lname" onChange={this.onFormchangeHandler} name="key" placeholder="Enter secret key"/>
    </div>
  </div>
    <div className={styles.row}>
  <label> 
    {encrypted}
    {decrypted}
  </label>
  <div className={styles.row}>
  <label>
    {this.state.display}
  </label>
  </div>
  </div>
    <div style={{text:"center"}} className={styles.row}>
    <button type="encrypt" onClick={this.recieveMessage}>Receive</button>
    <button type="encrypt" onClick={this.onEncryptHandler} onChange={this.onFormchangeHandler}>Encrypt</button>
    <button type="encrypt" onClick={this.onDecryptHandler} onChange={this.onFormchangeHandler} >Decrypt</button>
    <button type="encrypt" onClick={this.sendMessage}>Send</button>

  </div>
  </form>
</div>
    );
    }
}

export default Page1;


/*
<div className={styles.row}>
      <input type="text" name="sid" id="sid" onChange={this.onFormchangeHandler} placeholder="your id"/>
  </div>
  <div className={styles.row}>
      <input type="text" name="tid" id="tid" onChange={this.onFormchangeHandler} placeholder="target id"/>
  </div>*/