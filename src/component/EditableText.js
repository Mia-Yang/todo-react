import React from 'react';

class EditableText extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        value: props.value,
        edit: false
      }
    }

    handleFoucus = () => {
        this.setState({backup: this.state.value, value:'',})
    }

    handleInputChange = (e) => {
        this.setState({value:e.target.value})
    }

    handleBlur = (e) => {
        this.setState({edit:false})
        if(!this.state.value.length) {
            this.setState({value: this.state.backup})
        } else {
            this.props.editContent(this.props.id, this.state.value)
        }
    }

    render() {
      return (
        (this.state.edit===true &&
        <input 
          type={"text"}
          value={this.state.value}
          className={"editBox"}
          autoFocus
          onFocus={this.handleFoucus}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
        />)
        ||
        <span onClick={()=>{
            this.setState({edit:true})
          }}>
          {this.state.value}
        </span>
      )
    }
  }

  export default EditableText