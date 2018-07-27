import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import classnames = require("classnames");
import {observer} from 'mobx-react';
import {Ingredients} from '../ingredients/ingredents';

let styles = require('./home.scss');
import {HomeState, HomeStore} from "../../stores/home";
import {Ingredient} from "../../models/interface";

@observer
export class Home extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
        HomeStore.fetchFormulations();
        HomeStore.fetchIngredients();
    }

    componentWillMount(){

    }

    onBirthdayChange = (jsDate: moment.Moment, dateString: string): void => {
        HomeStore.birthday = jsDate;
    };

    onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        HomeStore.name = event.target.value;
    };

    onAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        HomeStore.address = event.target.value;
    };

    render() {
        return ( <div className={styles.phyFormcontainer}>
            <h1 className={styles.phyFormLegend}>Physician Form</h1>
            <Form className={styles.pad50}>
                <legend>User Info</legend>
                <FormGroup>
                    <label >Full Name</label>
                    <Input 
                        type="text" 
                        name="name" 
                        id="username"
                        placeholder="ex. Elina" 
                        onChange={this.onNameChange.bind(this)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="useraddress">Address</Label>
                    <Input 
                        type="text" 
                        name="name" 
                        id="useraddress" 
                        placeholder="ex. Headquarters 1120 N Street Sacramento 916-654-5266" 
                        onChange={this.onAddressChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="useraddress">Birthday</Label>
                    <DatePicker
                        className="form-control"
                        selected={HomeStore.birthday}
                        onChange={this.onBirthdayChange.bind(this)}
                    />
                </FormGroup>
                
                <FormGroup>
                    <legend>Formulation</legend>
                    <Input 
                        type="select" 
                        name="select" 
                        id="exampleSelect"
                        onChange={HomeStore.onFormulationChange.bind(HomeStore)}
                        >
                        {
                            HomeStore.formulations.map(ing => {
                                return (<option key={ing.id} value={ing.id}>{ing.name}</option>)
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Ingredients</Label>
                    <div className="flex-container">
                    {
                        HomeStore.selIngredients.map((ing:Ingredient, idx: number) => {
                            return (
                            <Ingredients 
                                key={ing.id} 
                                ingname={ing.name}
                                description={ing.description}
                                minimum_percentage={ing.minimum_percentage}
                                maximum_percentage={ing.maximum_percentage}
                                percentage={ing.percentage}
                                idx={idx}
                            />)
                        })
                    }
                    <br/>
                    </div>
                </FormGroup>
                <Button onClick={HomeStore.upload.bind(HomeStore)}>Submit</Button>
                { HomeStore.downloadable_url && <a href={HomeStore.downloadable_url}>{HomeStore.downloadable_url}</a> }
                { HomeStore.ErrorMessage && <a style={{color: 'red'}}>{HomeStore.ErrorMessage}</a> }
            </Form>
        </div>)
    }
}