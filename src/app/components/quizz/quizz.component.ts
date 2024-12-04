import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions  from '../../../../public/assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
title: string = ''
optionName: string = ''

question:any
questionSelected:any

answers:string[] = []
answersSelected:string = ""

questionIndex:number = 0
questionMaxIndex:number = 0

finished:boolean = false

  ngOnInit():void{
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.question = quizz_questions.questions
      this.questionSelected = this.question[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.question.length


    };
  }

  playerChoose(value: any){
    this.answers.push(value)
    this.nextstep()
  }

  async nextstep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){

      this.questionSelected = this.question[this.questionIndex]
    }
    else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previus, current, i, arr)=>{
      if(
        arr.filter(item => item === previus).length >
        arr.filter(item => item === current).length
      ){
        return previus
      }
      else{
        return current
      }
    })

    return result
  }





}


