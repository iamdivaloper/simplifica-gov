import { redirect } from "next/navigation"

export default function FavoritosRedirect() {
  redirect("/perfil?tab=favoritos")
}
