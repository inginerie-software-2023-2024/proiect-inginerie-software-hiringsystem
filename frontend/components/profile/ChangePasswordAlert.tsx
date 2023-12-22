import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"

export function ChangePasswordAlert() {
  return (
    <Alert variant="destructive">
    <AlertTriangleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your old password is not correct.
      </AlertDescription>
    </Alert>
  )
}