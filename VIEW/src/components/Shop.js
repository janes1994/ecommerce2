import React, {Component} from 'react';
import '../CSS/Shop.css'
import { NavLink } from 'react-router-dom';

export default class Shop extends Component {
    constructor(props){
        super(props);
        this.state = {
            record:[]
        }
    }

    componentDidMount(){
        this.fetchData();
        this.props.setPrice(this.state.record[0])
        // console.log(this.state.record)
    }

    componentDidUpdate(){
        console.log(this.state.record[0])
    }

    fetchData() {
        fetch(`http://localhost:5000/shop/${this.props.route}`)
          .then(response => response.json())
          .then(response => this.setState({record: response}))
          .catch(error => console.log(error))
      }

    render(){
        let record = this.state.record;
        let title, price, image, processor, ram, rom, port, keyboard,vga;
        record.map(i => {
            return (
                title = i.title,
                price = i.price,
                image = i.image,
                processor = i.processor,
                vga = i.vga,
                ram = i.ram,
                rom = i.rom,
                port = i.rom,
                port = i.port,
                keyboard = i.keyboard
            )
        })
        return(
            <div className="shop-page">
                <div className="shop-title">
                    <h1>{title}</h1>
                    <hr/>
                </div>

                <div className="shop-main">

                    <div className="shop-image">
                        <img src={`/images/shop/${image}`} alt="iphonex"></img>                        
                    </div>

                    <div className="shop-pay">
                        <div className="pay-title">
                            <h1>{title}</h1>
                        </div>
                        <div className="pay-specs">
                            <span>{processor}</span> <br/>
                            <span>{vga}</span> <br/>
                            <span>{ram}</span> <br/>
                            <span>{rom}</span> <br/>
                            <span>{port}</span> <br/>
                            <span>{keyboard}</span> <br/>
                        </div>

                    </div>
                </div>

                <div className="shop-price">
                    <div className="check-price">Rp {price}</div>
                    <NavLink exact to="/checkout2"><div className="check-bag">Beli</div></NavLink>
                </div>
            </div>
        )
    }
}