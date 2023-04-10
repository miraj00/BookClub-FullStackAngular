import { Component } from '@angular/core';
import { BookClubMembersService } from './book-club-members.service';
import { Member } from './member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookClub-FrontEnd';

  members: Member[] =[];
  newMember:Member = ({}as any)as Member;
  constructor(private API: BookClubMembersService){
    //Since were just dealing with a single component 
    //Putting our loadmembers in the constructor is fine
    this.loadMembers()
  }

  loadMembers():void{
    this.API.getAllMembers().subscribe(
      (result) =>{
        this.members = result;
      }
    )
  }

  readBook(index:number):void{
    let member:Member = this.members[index];
    member.booksRead++;
    this.API.updateMember(member).subscribe(
      (result) => {
        
      }
    ) 
  }

  deleteMember(id:number):void{
    // //Index and ID aren't going to match, so we grab the member to then get their id
    // let member:Member = this.members[index];
    // this.API.deleteMember(member.id).subscribe(
    //   ()=>{
    //     this.members.splice(index, 1);
    //   }
    // )

    this.API.deleteMember(id).subscribe(
      ()=>{
        //we need to find the index of the id
        // for(let i = 0; i <this.members.length; i++){
        //   let m:Member = this.members[i];
        //   if(m.id === id){
        //     this.members.splice(i, 1);
        //     break;
        //   }
        // }

        this.loadMembers();
      }
    )

  }

  addNewMember():void{
    console.log(this.newMember.foundingMember);
    if(this.newMember.foundingMember !==true){
      this.newMember.foundingMember = false;
    }
    this.API.addMember(this.newMember).subscribe(
      ()=>{
        //add our object to the front-end 
        this.members.push(this.newMember);

        //Then we clear the form out 
        this.newMember = ({}as any)as Member;
        //When pushing into the front-end only part of the data makes it in there 
        //To get all the properties, you need to load them from the API
        this.loadMembers();
      }
    )
  }
  
}
