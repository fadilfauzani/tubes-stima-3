import React from "react";
import axios from "axios";
export const Dropdown = (props) => {
   return (
      <div className="form-group">
         <strong>{props.name}</strong>
         <select id="hallo" className="form-control" name="{props.name}" onChange={props.onDropdownChange}>
            <option defaultValue>Select {props.name}</option>
            {props.options.map((item) => (
               <option key={item.id}>{item.nama}</option>
            ))}
         </select>
      </div>
   );
};

class NameForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = { nama: "", list: [], idPenyakit: 0, success: false, textloaded: false, text: "", hasil: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({ nama: event.target.value });
   }

   handleSubmit(event) {
      event.preventDefault();
      while (!this.state.textloaded) {}
      // console.log("submitted");

      axios
         .post("http://localhost:9000/api/penyakit-hist", {
            Name: this.state.nama,
            idPenyakit: this.state.idPenyakit,
            textDNA: this.state.text,
         })
         .then((res) => {
            alert(res.data.type);
            if (res.data.success) {
               let date = new Date();
               var str = "";
               str += date.toLocaleString("id", { day: "numeric", year: "numeric", month: "long" }) + "-";
               str += res.data.nama + "-";
               str += res.data.penyakit + "-";
               str += res.data.hasil;
               this.setState({ hasil: str });
            }
         })
         .catch((err) => {
            alert(err);
         });
      // window.location.replace(window.location);
   }
   componentDidMount() {
      fetch("http://localhost:9000/api/penyakit")
         .then((response) => response.json())
         .then((item) => this.setState({ list: item }))
         .then(() => this.setState({ success: true }));
   }

   onDropdownChange = (e) => {
      this.setState({ idPenyakit: e.target.options.selectedIndex });
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
      if (this.state.success)
         return (
            <form id="myForm" onSubmit={this.handleSubmit}>
               <label>
                  Name:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
               </label>
               <div>
                  {/* <h2>React Bootstrap Dropdown Select Box Example</h2> */}
                  <Dropdown name={"Penyakit"} options={this.state.list.rows} onDropdownChange={this.onDropdownChange} />
               </div>
               <input type="file" accept=".txt" onChange={(e) => this.showFile(e)} />
               <input type="submit" value="Submit" />
               <h1>{this.state.hasil}</h1>
            </form>
         );
   }
}
export default NameForm;
