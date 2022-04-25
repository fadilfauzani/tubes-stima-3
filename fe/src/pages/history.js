import React from "react";
import axios from "axios";

class History extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         list: [],
         success: false,
      };
   }
   componentDidMount() {
      axios
         .get("http://localhost:9000/api/penyakit-hist")
         .then((response) => response.data)
         .then((item) => this.setState({ list: item }))
         .then(() => {
            this.setState({ success: true });
            console.log(this.state.list);
         });
   }
   render() {
      if (this.state.success) {
         const list = [];
         this.state.list.rows.forEach((element) => {
            list.push(
               <h1>
                  {element.tanggal_test}-{element.nama_pengguna}-{element.nama_penyakit}-{element.hasil.toString()}
               </h1>
            );
         });
         return <div> {list} </div>;
      } else return <p> Loading... </p>;
   }
}
export default History;
