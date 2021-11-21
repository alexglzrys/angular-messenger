import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getStatus().pipe(
        // Mapear la respuesta que viene en el flujo de datos
        map(status => {
          if (status) {
            return true;
          } else {
            // Redireccionar a otra parte si el el usuairo no esta autentificado
            this.router.navigate(['/login'])
            return false;
          }
        }) // No me suscribo, ya que por defecto se puede retornar un Observable de tipo booleano
      )
  }

}
