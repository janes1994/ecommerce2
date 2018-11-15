import React, {Component} from 'react';
import '../CSS/Admin.css'

export default class Admin extends Component {
    render(){
        return(
            <div className="admin-panel">

                <div className="admin-sidebar">
                    <div className="sidebar-section">
                        <p>Inventory Barang</p>
                    </div>
                    <div className="sidebar-section">
                        <p>Order Masuk</p>
                    </div>
                    <div className="sidebar-section">
                        <p>Dashboard</p>
                    </div>
                    <div className="sidebar-section">
                        <p>Dashboard</p>
                    </div>
                </div>

            </div>
        )
    }
}