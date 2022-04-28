import React from "react";
import axios from "axios";

class History extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         list: [],
         success: false,
         text: "",
      };
      // this.delta = this.delta.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   handleChange(event) {
      this.setState({ text: event.target.value });
      this.takeData();
   }
   componentDidMount() {
      this.takeData();
   }
   takeData() {
      // console.log(this.state.text);
      axios
         .post("http://localhost:9000/api/penyakit-histo", { text: this.state.text })
         .then((response) => response.data)
         .then((item) => this.setState({ list: item }))
         .then(() => {
            this.setState({ success: true });
            // console.log(this.state.list);
         });
   }
   render() {
      // this.takeData();
      if (this.state.success) {
         const list = [];
         this.state.list.rows.forEach((element) => {
            list.push(
               <h1 key={element.id}>
                  {element.tanggal_test}-{element.nama_pengguna}-{element.nama_penyakit}-{element.hasil.toString()}
               </h1>
            );
         });
         return (
            <div>
               <input type="text" value={this.state.text} onChange={this.handleChange} />
               <div> {list} </div>
            </div>
         );
      } else return <p> Loading... </p>;
   }
}
export default History;
