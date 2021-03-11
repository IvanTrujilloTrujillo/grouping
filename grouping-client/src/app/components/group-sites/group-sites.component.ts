import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Groups } from 'src/app/models/groups';
import { EdgeService } from 'src/app/services/edge.service';
import { NewSiteComponent } from '../new-site/new-site.component';

@Component({
  selector: 'app-group-sites',
  templateUrl: './group-sites.component.html',
  styleUrls: ['./group-sites.component.css']
})
export class GroupSitesComponent implements OnInit {

  @Input() groupId!: number;

  constructor(
    public edgeService: EdgeService,
    private router: Router,
    private newSiteDialog: MatDialog,
    private route: ActivatedRoute
  ) {

    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
  }

  ngOnInit(): void {
    if(this.edgeService.tocken === null || this.edgeService.tocken === '') {
      this.router.navigate(['/login']);
    } else {
      this.getSitesByGroupId(this.groupId);
      this.edgeService.userId = Number(this.edgeService.tocken.substr(0, 4));
    }
  }

  getSitesByGroupId(id: number): void {
    this.edgeService.getSitesByGroupId(id).subscribe(result => {
      this.edgeService.siteList = result;
    }, error => {
      alert("You don't have access to this group");
      this.router.navigate(['/groups']);
    });
  }

  openNewSiteDialog(): void {
    let dialogRef = this.newSiteDialog.open(NewSiteComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.componentInstance.siteGroupList = this.edgeService.siteList;

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {this.ngOnInit();}, 200);
    });
  }

}
