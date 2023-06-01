import React, { Component } from 'react'
import { getCategories, getProductsofCategory } from '../../CallApis';

const host = "http://localhost:5000";
class Tablerow extends Component {
    constructor() {
        super();
        this.state = {
            categories: null,
            products: null
        }
        this.handleCategorychange = this.handleCategorychange.bind(this);
    }
    async componentDidMount() {
        let categories = await getCategories();//all categories
        let unselectedCats=[];
        let c=0,count=0;
        let selectedCats=this.selectedCats();
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < selectedCats.length; j++) {
                // no. of times a category selected in rows
                if(categories[i].cat_id==selectedCats[j]){
                count++;
            }
            }
            let products = await getProductsofCategory(categories[i].cat_id);
            if(count<products.length){
                unselectedCats[c]=[{_id:"",prod_id:"", name:""}]
                unselectedCats[c]._id=categories[i]._id;
                unselectedCats[c].cat_id=categories[i].cat_id;
                unselectedCats[c].name=categories[i].name;
                c++;
            }
            count=0;
        }
        if(unselectedCats.length!=0)
        this.setState({ categories: unselectedCats })
    }
    async handleCategorychange() {
        let category = document.getElementsByName('category')[this.props.row].value;
        let products = await getProductsofCategory(category);
        let unselectedProds=[];
        let c=0,f=0;
        let selectedProds=this.selectedProds();
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < selectedProds.length; j++) {
                if(products[i].prod_id==selectedProds[j]){
                f=1;
                break;
            }
            }
            if(f==0){
                unselectedProds[c]=[{_id:"",prod_id:"", name:"", desc:"", pic:""}]
                unselectedProds[c]._id=products[i]._id;
                unselectedProds[c].prod_id=products[i].prod_id;
                unselectedProds[c].name=products[i].name;
                unselectedProds[c].desc=products[i].desc;
                unselectedProds[c].pic=products[i].pic;
                c++;
            }
            f=0;
        }
        if(unselectedProds.length!=0)
        this.setState({ products: unselectedProds })
    }
    selectedProds(){
        let trs=document.getElementsByTagName('tr');
        let selected=[];
        for (let index = 1; index < trs.length-2; index++) {
            selected[index-1]=trs[index].childNodes[1].childNodes[0].value;
        }
        return selected;
    }
    selectedCats(){
        let trs=document.getElementsByTagName('tr');
        let selected=[];
        for (let index = 1; index < trs.length-2; index++) {
            selected[index-1]=trs[index].childNodes[0].childNodes[1].value;
        }
        return selected;
    }
    onChange(){
        let price=0,qnty=0;
        let trs=document.getElementsByTagName('tr');
        for (let i = 1; i < trs.length-1; i++) {
            price=trs[i].childNodes[2].firstChild.value;   
            qnty= trs[i].childNodes[3].firstChild.value;   
        }
        // e.target.name[0].value=val
    }
    render() {
        return (
            <tr>
                <td className="align-middle"><img src={require("./../img/product-1.jpg")} alt="" style={{ width: '50px' }} />
                    <select className="custom-select" name='category' onChange={this.handleCategorychange}>
                        <option></option>
                        {this.state.categories != null ? this.state.categories.map(category => {
                            return <option key={category.cat_id} value={category.cat_id}>{category.name}</option>
                        }) : <option>No Catgeory available</option>
                        }
                    </select></td>
                <td className="align-middle">
                    <select className="custom-select" name='product' >
                    <option></option>
                        {this.state.products != null ? this.state.products.map(product => {
                            return <option key={product._id} value={product.prod_id}>{product.name}</option>
                        }) : <option>No Product available</option>
                        }
                    </select></td>
                <td className="align-middle">
                    <input style={{ width: '100px' }} type="number" name="price" className="form-control form-control-sm text-center" defaultValue={0} onChange={this.onChange} />
                    </td>
                <td className="align-middle">
                    <input style={{ width: '100px' }} type="number" name="qnty" className="form-control form-control-sm text-center" defaultValue={0} onChange={this.onChange} />
                    </td>
            </tr>
        );
    }
}

export default Tablerow;