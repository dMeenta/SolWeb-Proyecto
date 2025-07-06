import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  ColorThiefModule,
  ColorThiefService,
} from '@soarlin/angular-color-thief';
import {
  activeChatSignal,
  openChatSignal,
} from '../../shared/ui/signals/openChat.signal';

export interface Friend {
  friendUsername: string;
  friendProfilePicture: string;
}

@Component({
  selector: 'app-friend-list-object',
  imports: [CommonModule, ColorThiefModule],
  templateUrl: './friend-list-object.component.html',
  styleUrl: './friend-list-object.component.css',
})
export class FriendListObjectComponent {
  @ViewChild('imgRef') imgRef!: ElementRef<HTMLImageElement>;
  @Input() friend!: Friend;
  dominantColor: number[] | null = null;

  constructor(private colorThief: ColorThiefService) {}

  ngAfterViewInit() {
    const img = this.imgRef.nativeElement;
    img.crossOrigin = 'anonymous'; // Necesario si la imagen viene de otro origen
    if (img.complete) {
      this.processImageColors(img);
    } else {
      img.onload = () => {
        this.processImageColors(img);
      };
    }
  }

  openChatWith() {
    openChatSignal.update((prev) => {
      const alreadyOpen = prev.some(
        (f) => f.friendUsername === this.friend.friendUsername
      );

      // Solo agrega si no está
      if (!alreadyOpen) {
        const updated = [
          ...prev,
          {
            friendUsername: this.friend.friendUsername,
            friendProfilePicture: this.friend.friendProfilePicture,
          },
        ];

        // Mantener máximo 3
        return updated.slice(-3);
      }

      // Si ya estaba, no modificamos el array
      return prev;
    });

    // Activar el chat (mostrarlo)
    activeChatSignal.set(this.friend.friendUsername);
  }

  private processImageColors(img: HTMLImageElement) {
    const palette = this.colorThief.getPalette(img, 10);
    this.dominantColor = this.getBestBackgroundColor(palette);
  }

  getTextColor(bgColor: number[]): string {
    const [r, g, b] = bgColor;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  getBestBackgroundColor(palette: number[][]): number[] {
    if (!palette || palette.length === 0) {
      return [200, 200, 200]; // Fallback seguro
    }

    const rgbToHsl = ([r, g, b]: number[]): [number, number, number] => {
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic (gris, blanco, negro)
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h * 360, s * 100, l * 100];
    };

    // Recorre la paleta con la intención de devolver el color inmediatamente si cumple un criterio fuerte.
    // Esto asegura la máxima prioridad para los colores que estamos buscando específicamente.
    for (const color of palette) {
      const [r, g, b] = color;
      const [hue, saturation, lightness] = rgbToHsl(color);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      // 1. **PRIORIDAD MÁXIMA: Detección de Negro puro**
      // Un negro real tendrá componentes RGB muy bajos y muy poca saturación.
      // Basado en tu paleta, [6, 9, 9] es un candidato perfecto.
      if (r < 20 && g < 20 && b < 20 && saturation < 25) {
        // RGB muy bajos y saturación baja
        return color; // ¡Devuelve el negro inmediatamente!
      }
    }

    // Si no encontramos un negro puro, ahora buscamos los otros tipos de colores
    // Esta parte se ejecuta solo si no se ha devuelto un negro.
    let redCandidate: number[] | null = null;
    let vibrantCandidate: number[] | null = null;

    let maxVibrantSaturation = -1;
    let bestRedSaturation = -1;

    for (const color of palette) {
      const [r, g, b] = color;
      const [hue, saturation, lightness] = rgbToHsl(color);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      // 2. Detección de Rojo:
      if (
        (hue < 15 || hue > 345) &&
        saturation > 60 &&
        brightness > 80 &&
        brightness < 200
      ) {
        if (saturation > bestRedSaturation) {
          bestRedSaturation = saturation;
          redCandidate = color;
        }
      }

      // 3. Detección de Colores Vibrantes (Amarillo, Verde Neón, Azul de Isagi):
      if (saturation > 70 && brightness > 60 && brightness < 220) {
        if (saturation > maxVibrantSaturation) {
          maxVibrantSaturation = saturation;
          vibrantCandidate = color;
        }
      }
    }

    // Orden de prioridad final si no se encontró un negro:
    if (redCandidate) {
      return redCandidate;
    }
    if (vibrantCandidate) {
      return vibrantCandidate;
    }

    // Si ninguna de las condiciones anteriores se cumple de forma convincente,
    // usamos el color más dominante (el primero de la paleta) como último recurso.
    // Esto es un buen último recurso para otros casos.
    return palette[0];
  }
}
