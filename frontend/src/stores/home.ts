import {action, observable} from 'mobx';
import {FormulationsApi, IngredientsApi} from "../api/api";
import RouterStore from "./router"
import {views} from "./views";
import {Formulation, Ingredient} from '../models/interface';
import * as moment from 'moment';
const formulationsApi: FormulationsApi = new FormulationsApi();
const ingredientsApi: IngredientsApi = new IngredientsApi();

const Custom_FORM_ID: number = 10000;
const Predefined_FORM: number = 10002;
const No_FORM_ID: number = 10001;

export  enum HomeState {
    UserInput,
    Uploading,
    Error,
}

interface IrdIDPerc {
    ingredient_id: number,
    percentage: number
}

interface IFormUploadResponse {
    success: boolean,
    message: string,
    url: string
}

interface ErrorObject {
    [key: number]: boolean
}
// class FormulationObservable {
//     @observable id: number;
//     @observable name: string;
// }

class HomeObservable {
    @observable State: HomeState;
    @observable ErrorMessage: string;
    @observable formulations: Formulation[];
    @observable ingredients: Ingredient[];
    @observable selIngredients: Ingredient[];
    @observable selIngErrs: ErrorObject;
    @observable selFormID: number; 
    @observable birthday: moment.Moment;
    name: string;
    address: string;
    @observable downloadable_url: string;

    constructor() {
        this.State = HomeState.UserInput;
        this.formulations = [];
        this.ingredients = [];
        this.selIngredients = [];
        this.selIngErrs = {};
        this.birthday = moment("1-1-1995", "MM-DD-YYYY");
    }

    fetchFormulations() {
        console.log("start fetching Formulations");
        formulationsApi.fetchAll().then((response: Response) => {

            response.json().then(((formulations: Formulation[]) => {
                this.formulations = [{id: No_FORM_ID, name: ""}, {id: Custom_FORM_ID, name: "Custom"}].concat(formulations);
                console.log("result fetched Formulations", formulations);
            }))

        }).catch((response: Response) => {
            this.State = HomeState.Error;
        })
    }


    fetchIngredients() {
        console.log("start fetching ingredients");
        ingredientsApi.fetchAll().then((response: Response) => {

            response.json().then(((ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
                console.log("result fetched ingredients", ingredients);
            }))

        }).catch((response: Response) => {
            this.State = HomeState.Error;
        })
    }

    @action 
    onFormulationChange(event: React.ChangeEvent<HTMLInputElement>): void {

        if (parseInt(event.target.value) == Custom_FORM_ID) {
            this.selIngredients = this.ingredients;
            this.selIngredients.map(ing => {ing.percentage = 101});
            this.selIngErrs = {};
            this.selFormID = Custom_FORM_ID;
        } else if (parseInt(event.target.value) == No_FORM_ID) {
            this.selIngredients = [];
            this.selIngErrs = {};
            this.selFormID = No_FORM_ID;
        } else {
            var formData = new FormData();
            formData.append("formulation_id", event.target.value);
            ingredientsApi.filter({
                body: formData
            }).then((response: Response) => {

                response.json().then(((query: IrdIDPerc[]) => {
                    this.selIngredients = [];
                    this.selIngErrs = {};
                    this.selFormID = Predefined_FORM;

                    query.map(row => {
                        const filtered_ings = this.ingredients.filter(ing => ing.id == row.ingredient_id);
                        if (filtered_ings.length){
                            filtered_ings[0].percentage = row.percentage;
                            this.selIngredients.push(filtered_ings[0]);
                        } else {
                            console.log("no result with row.id", row.ingredient_id);
                        }
                    })
                }))
    
            }).catch((response: Response) => {
                this.State = HomeState.Error;
            })
        }
    }

    errorExist(idx: number) {
        if (this.selFormID == Custom_FORM_ID && 
                (!this.selIngredients[idx].percentage || this.selIngredients[idx].percentage == 101)){
            this.selIngErrs[idx] = false;
        }
        else if  (this.selIngredients[idx].percentage - this.selIngredients[idx].minimum_percentage < 0 ) {
            this.selIngErrs[idx] = true;
        } 
        else if (this.selIngredients[idx].percentage - this.selIngredients[idx].maximum_percentage > 0){
             this.selIngErrs[idx] = true;
        } else {
            this.selIngErrs[idx] = false;
        }
        this.selIngErrs = JSON.parse(JSON.stringify(this.selIngErrs));
        return this.selIngErrs[idx];
    }

    totalErrorExist(){
        var errorExist: boolean = false;
        for (var i = 0; i < this.selIngredients.length; i ++){
            if (this.errorExist(i)){
                errorExist = true;
            }
        }
        return errorExist;
    }
    @action
    upload(form: any) {
        if (this.totalErrorExist()){
            alert("cannot upload due to issue on input!");
            return;
        }
        this.State = HomeState.Uploading;
        let formData: any = new FormData(form);
        formData.append("name", this.name);
        formData.append("address", this.address);
        formData.append("birthday", this.birthday);
        if (this.selFormID == Custom_FORM_ID) {
            this.selIngredients = this.selIngredients.filter(item => (item.percentage && item.percentage != 101));
        }
        formData.append('ingredients', JSON.stringify(this.selIngredients));
        
        console.log(this);
        console.log(this.selIngredients);
        console.log(JSON.stringify(this.selIngredients));

        formulationsApi.upload({
            body: formData
        }).then((response: Response) => {

            response.json().then(((res: IFormUploadResponse) => {
                if (res.success){
                    alert(res.url);
                    this.downloadable_url = res.url;
                    this.ErrorMessage = null;
                } else {
                    alert(res.message);
                    this.downloadable_url = null;
                    this.ErrorMessage = res.message;
                }
                this.State = HomeState.UserInput;
            }))

        }).catch((response: Response) => {
            this.State = HomeState.Error;
        })
    }
}


export let HomeStore = new HomeObservable();