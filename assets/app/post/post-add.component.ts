import { Component } from "@angular/core";


@Component({
    selector: 'app-post-add',
    template: `
    <div class="post-add-box">
    <div class="form-group">
            <label for="sel1">Purpose</label>
            <select class="form-control post-add__select" id="sel1">
              <option>General</option>
              <option>Looking for Partners</option>
              <option>Looking to Hire</option>
            </select>
    </div>
    <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title">
    </div>
    <div class="form-group">
            <label for="info">About</label>
            <textarea class="form-control" rows="4" id="info"></textarea>
    </div>
    
    <button class="btn btn--green post-add__btn">Post</button>
</div>
    `
})
export class PostAddComponent {
   
}