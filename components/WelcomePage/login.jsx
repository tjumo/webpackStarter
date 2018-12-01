import React from "react";
import bgmasthead from "../images/bgmasthead.jpg";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            login: '',
            password: ''
        }
    }

    loginHandler = (e) => {
        this.setState({
            login: e.currentTarget.value
        })
    };

    passwordHandler = (e) => {
        this.setState({
            password: e.currentTarget.value
        })
    };

    btnHandler = (event) => {
        event.preventDefault();
        if(typeof this.props.onLog === 'function'){
            let logged = this.props.onLog(this.state.login, this.state.password);
            if (!logged) {
                this.setState({
                    login: '',
                    password: ''
                });
            }
        }
    };

    componentWillUnmount() {
        this.state = {};
    }

    render(){

        // let style = {textAlign: "center", color:"grey"};
        let sectionStyle = {
            width: "100%",
            height: "671px",
            backgroundPosition: "center",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${bgmasthead})`
        };
        return (<section style={sectionStyle}>
            <br />
            <h1 className={"text-center display-1"}>Create your own financial cosmos</h1>
            <br />
            <div className="text-center">
                <h2>Logowanie</h2>
                {this.props.wrong? <span style={{color: "red"}}>Błędne dane logowania</span> : <br />}
            </div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="login-input" className="control-label col-sm-4">Użytkownik: </label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="login-input"
                               onChange={this.loginHandler} value={this.state.login}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password-input" className="control-label col-sm-4">Hasło: </label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" name="password-input"
                               onChange={this.passwordHandler} value={this.state.password}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-4">
                        <button className="btn btn-primary btn-block" onClick={this.btnHandler}>Zaloguj</button>
                    </div>
                </div>
            </form>
        </section>)
    }
}

