import React from 'react';
const USERS_URL = 'https://jsonplaceholder.typicode.com/';

class Table extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          users:[],
          currentPage:1,
          postsPerPage:10,
          isLoaded: false,
          count:0
      };
  }
  componentDidMount(){
      this.getUsers();
  }
  getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          users: response
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          users:[],
          error
        });
      }
    )
  }
 
  renderUsers = () =>{
      const {users,currentPage,postsPerPage} = this.state;
      
      if(users && users.length === 0){
        return null;
      }else{
      const lastPage = currentPage * postsPerPage;
      const firstPage = lastPage - postsPerPage;
      const filteredUsers = users.slice(firstPage,lastPage);

      return filteredUsers.map((user)=>{
            return (<tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td>{user.completed ? 'True' : 'False'}</td>
            </tr>)
            })
      }
    }
    firstPage = () =>{
      this.setState({currentPage:1});
    }
    lastPage = () =>{
      const {users,postsPerPage} = this.state;
      const lastPage = Math.ceil(users.length / postsPerPage);
      this.setState({currentPage:lastPage});
    }
    nextpage = () =>{
      const {users,currentPage,postsPerPage} = this.state;
      const lastPage = Math.ceil(users.length / postsPerPage);
      const nextPage =  (currentPage === lastPage)?this.state.currentPage: this.state.currentPage + 1;
      this.setState({currentPage: nextPage});
    }
    previousPage = () =>{
      const page = this.state.currentPage - 1 || 1;
      this.setState({currentPage:page});
    }
    render(){  
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
           <tbody>
              {this.renderUsers()}
              </tbody>
          </table>
          <section className="pagination">
            <button className="first-page-btn" onClick={this.firstPage}>first</button>
            <button className="previous-page-btn" onClick={this.previousPage}>previous</button>
            <button className="next-page-btn" onClick={this.nextpage}>next</button>
            <button className="last-page-btn" onClick={this.lastPage}>last</button>
          </section>
        </div>
      );
  }
};
export default Table;
