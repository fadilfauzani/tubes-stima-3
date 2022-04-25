import React from "react";
import axios from "axios";

class PenyakitForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = { value: "", chosenValue: "", success: false, textloaded: false, text: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({ value: event.target.value });
   }

   handleSubmit(event) {
      event.preventDefault();
      alert("A name was submitted: " + this.state.value + " textpenyakit : " + this.state.chosenValue);
      while (!this.state.textloaded) {}
      alert(this.state.text);
      console.log(this.state.text);
      axios
         .post("http://localhost:9000/users/api", {
            Name: this.state.value,
            textPenyakit: this.state.text,
         })
         .then(function (response) {
            console.log(response);
         });
   }
   onDropdownChange = (e) => {
      this.setState({ chosenValue: e.target.value });
   };
   showFile = async (e) => {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
         const text = e.target.result;
         this.setState({ text: text, textloaded: true });
      };
      reader.readAsText(e.target.files[0]);
   };
   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <label>
               Name:
               <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="file" accept=".txt" onChange={(e) => this.showFile(e)} />
            <input type="submit" value="Submit" />
         </form>
      );
   }
}
export default PenyakitForm;
