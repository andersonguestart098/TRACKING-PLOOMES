import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2"

export function customAlert(message: string, type: SweetAlertIcon , meta?: {
    timer?: number,
    position?: SweetAlertPosition 
}) {
    document!.activeElement!.blur()
    const Toast = Swal.mixin({
        toast: true,
        position: meta?.position ?? 'top-right',
        showConfirmButton: false,
        timer: meta?.timer ?? 3000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
      
    return Toast.fire({
        icon: type,
        title: message
    })
}