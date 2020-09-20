import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';

class QuestionTable extends Component {

    state = {
        columns: [
            { title: 'Soru', field: 'question' },
            { title: 'Soru Tipi', field: 'questionType'},
            { title: 'Soruyu cevaplamak zorunlu mu ', field: 'isQuestionRequired'},
            {title : 'Sorunun beklenen cevabının en küçük değeri', field : 'expectedMinValueAnswerOfQuestion'},
            {title : 'Sorunun beklenen cevabının en büyük değeri', field : 'expectedMaxValueAnswerOfQuestion'},
        ],
    }

    render() {
        const {columns} = this.state;
        const {questions,onDeleteQuestion} = this.props;
        return (
            <div className={"mt-5"}>
                <MaterialTable columns={columns}
                               data={questions}
                               title={<Typography variant="h4" component="h5">
                                   Eklediğiniz Soruların Listesi
                                     </Typography>}
                               actions ={[{
                                   icon :  'delete',
                                   tooltip: 'Sil',
                                   onClick: (e, rowData,) => onDeleteQuestion(e,questions.indexOf(rowData))
                               }]}/>
            </div>
        );
    }
}
export default QuestionTable;