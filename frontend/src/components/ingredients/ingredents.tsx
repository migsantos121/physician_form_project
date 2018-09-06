import * as React from 'react';
import {
    Label, Input
} from 'reactstrap';
import {observer} from 'mobx-react';
import {HomeStore} from '../../stores/home';
let styles = require('./ingredients.scss');

interface PropsT {
    ingname: string, 
    description: string, 
    minimum_percentage: number, 
    maximum_percentage:number,
    percentage: number
    idx: number
}
interface StateT {
    value: string
}

function cloneObject(obj: Object){
    return JSON.parse(JSON.stringify(obj));
}

@observer
export class Ingredients extends React.Component<PropsT, StateT> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: null
        };
    }

    onChange(event:React.ChangeEvent<HTMLInputElement>){
        var strValue: string = event.target.value;
        if (strValue.length && strValue[strValue.length-1] == '0'){
            this.setState({value: strValue});
            return;
        }
        this.setState({value: null});
        const {idx} = this.props;
        HomeStore.selIngredients[idx].percentage = parseFloat(event.target.value);
        HomeStore.selIngredients = cloneObject(HomeStore.selIngredients);
        HomeStore.errorExist(idx);
    }

    onBlur(event:React.ChangeEvent<HTMLInputElement>){
        const {idx} = this.props;
        const iffErr: boolean = HomeStore.errorExist(idx);
        this.setState({value: null});
    }

    render() {
        var {ingname, maximum_percentage, minimum_percentage, percentage, idx} = this.props;
        return ( <div className='flex-item'>
                    <Label className={styles.ingName}>{ingname}</Label>
                    <Label className={styles.ingPercent}>{minimum_percentage}-{maximum_percentage}%</Label>
                    <Input 
                        type='number' 
                        name='name' 
                        id='username' 
                        step='0.01' 
                        value={this.state.value || (percentage&& percentage != 101 && percentage.toString())}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        className={HomeStore.selIngErrs[idx]? styles.errorBorder: ''}
                        />
                </div>)
    }
}