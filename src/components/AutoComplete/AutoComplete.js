import React from 'react';
import styles from './AutoComplete.module.css';
// you should import `lodash` as a whole module
import _ from 'lodash';

const ITEMS_API_URL = 'https://restcountries.eu/rest/v2/name/';
const USERS_URL = 'https://restcountries.eu/rest/v2/name/';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

class AutoComplete extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            suggesstions: [],
            text:'',
            isLoaded: false,
            items:[],
            searchTerm:'',
            selectedCountry:''
        };
        this.onEnterDebouce = _.debounce((value)=>this.onEnter(value), DEBOUNCE_DELAY);
    }
    getUsers = (pageNo) => {
      const url = `${USERS_URL + pageNo}`;
     
      fetch(url)
        .then(res =>{
            if(!res.ok) throw new Error(res.status);
            else return res.json();
        })
        .then(
            (users) =>{
            this.setState({
                isLoaded:true,
                users,
                count:users.length,
                error:null
            });
            },
            (error) => {
                this.setState({
                    isLoaded:true,
                    users:[],
                    count:0,
                    error
                });
            }
        )
    } 
    getList = (term) => {
        const url = `${USERS_URL + term}`;
        fetch(url)
          .then(res => {
            if(!res.ok) throw new Error(res.status);
            else return res.json();
          })
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result,
                error:null
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                items:[],
                error
              });
            }
          )
      }
      onEnter = (value) =>{
        const searchTerm = value;
        
        if(searchTerm.length > 0){
            this.setState({searchTerm,isLoaded:false},()=>{
                this.getList(searchTerm);
            });
         }
         this.setState({text:searchTerm});
    }
    onSelectItem = (name) => {

    }
    renderSuggestions = ()=> {
        const suggestions = this.state.items;
        console.log(suggestions);
        if(suggestions && suggestions.length === 0){
            return null;
        }else{
           return(
            <div className={styles.list}>
                    {
                        suggestions.map((item) => 
                        <div className="text-left" ><a href="#" className="list-item" key={item.name}
                         onClick={()=>this.onSelect(item.name)}>{item.name}</a></div>)
                        
                    }
                </div>
           ) 
        }

    }
    onSelect = (value) =>{
        this.setState({selectedCountry:value,text:'',items:[]});
    }
    render(){
      const {text,error,selectedCountry} = this.state;
      
      return (
        <div className="wrapper">
          <div className="control">
            <input value={text} type="text" className="input" onChange={(e) => this.onEnterDebouce(e.target.value)} />
          </div>
          
             {this.renderSuggestions()}
             {selectedCountry && <div>{selectedCountry}</div>}
             {error && <div>An error occured while fetching</div>}
        </div>
         
      );
    }
}
export default AutoComplete;