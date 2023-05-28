export default class loadMoreBtn {
static classes = {
    hidden: "hidden",
}
constructor(selector, isHidden = false) {
this.button = this.btnLoadMore(selector)
isHidden && this.hideBtn();
}
btnLoadMore(selector){
    return document.querySelector(selector);
}
hideBtn(){
    this.button.classList.add(loadMoreBtn.classes.hidden);
}
removeBtn(){
    this.button.classList.remove(loadMoreBtn.classes.hidden);
}
exclude(){
    this.button.disabled = true;
}
include(){
    this.button.disabled = false;
}
}

