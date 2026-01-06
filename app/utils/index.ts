export const formatDate = (dateStr:string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(dateStr).toLocaleDateString('es-ES', options)
}

export const getInitials = (firstName:string, lastName:string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
}