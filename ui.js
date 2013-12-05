'use strict';

/*
 * ItemListControl
 */
(function(global, document){
var fn;
global.ItemListControl = function(){
    this.init.apply(this, arguments);
}
fn = global.ItemListControl.prototype;
fn.init = function(opt){
    var self = this,
        i, il,
        j, jl;
    self.index = opt.index || 0;

    self.navElms = document.querySelectorAll(opt.navElms);
    self.navLiElms = [];
    self.prevElms = [];
    self.nextElms = [];
    for(i=0, il=self.navElms.length; i<il; i++){
        self.navLiElms[i] = self.navElms[i].querySelectorAll('li');
        for(j=0, jl=self.navLiElms[i].length; j<jl; j++){
            self.navLiElms[i][j].addEventListener('click', self.set.bind(self, j), false);
        }
        self.prevElms[i] = self.navElms[i].querySelector('.prev');
        self.nextElms[i] = self.navElms[i].querySelector('.next');
        self.prevElms[i].addEventListener('click', self.prev.bind(self), false);
        self.nextElms[i].addEventListener('click', self.next.bind(self), false);
    }
    self.itemElms = document.querySelectorAll(opt.itemElms);
    self.groupMemberNum = opt.groupMemberNum;
    self.groupNum = Math.ceil(self.itemElms.length / self.groupMemberNum);
    self.groups = new Array(self.groupNum);
    self.listGrouping();

    self.set(self.index);
}
fn.set = function(setIndex){
    var self = this,
        index = self.index = setIndex,
        navLiElms = self.navLiElms,
        groups = self.groups,
        prevElms = self.prevElms,
        nextElms = self.nextElms,
        i, il,
        j, jl;
    for(i=0, il=groups.length; i<il; i++){
        for(j=0, jl=groups[i].length; j<jl; j++){
            groups[i][j].style.display = (i===index) ? 'block' : 'none';
        }
    }
    for(i=0, il=navLiElms.length; i<il; i++){
        for(j=0, jl=groups.length; j<jl; j++){
            if(self.navLiElms[i][j] === undefined){
                console.log('"li of nav" missing.');
                break;
            }
            if(j===index){
                navLiElms[i][j].classList.add('current');
            }else{
                navLiElms[i][j].classList.remove('current');
            }
        }
    }
    if(index === 0){
        for(i=0, il=navLiElms.length; i<il; i++){
            prevElms[i].disabled = true;
        }
    }else{
        for(i=0, il=navLiElms.length; i<il; i++){
            prevElms[i].disabled = false;
        }
    }
    if(index === self.groupNum-1){
        for(i=0, il=navLiElms.length; i<il; i++){
            nextElms[i].disabled = true;
        }
    }else{
        for(i=0, il=navLiElms.length; i<il; i++){
            nextElms[i].disabled = false;
        }
    }
}
fn.listGrouping = function(){
    var self = this,
        itemElms = self.itemElms,
        groupMemberNum = self.groupMemberNum,
        groupNum = self.groupNum,
        groups = self.groups,
        i, il,
        j, jl;
    for(i=0, il=groups.length; i<il; i++){
        groups[i] = [];
        for(j=0, jl=itemElms.length; j<jl; j++){
            if(j >= (((i+1)*groupMemberNum) - groupMemberNum) && j < (i+1)*groupMemberNum){
                groups[i].push(itemElms[j]);
            }
        }
    }
}
fn.prev = function(){
    var self = this,
        index = self.index;
    if(index > 0){
        index--;
        self.set(index);
    }
}
fn.next = function(){
    var self = this,
        index = self.index;
    if(index < self.groupNum-1){
        index++;
        self.set(index);
    }
}
})(this, this.document);
