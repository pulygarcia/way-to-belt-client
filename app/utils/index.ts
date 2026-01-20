export const formatDate = (dateStr:string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(dateStr).toLocaleDateString('es-ES', options)
}

export const getInitials = (firstName:string, lastName:string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
}

//Form INPUT classes for FormKit
export const inputClasses = {
    outer: 'mb-5',
    label: 'block text-[10px] font-black uppercase text-blue-400 mb-1 tracking-widest',
    inner: 'bg-white/5 border border-white/10 focus-within:border-blue-500 transition-colors',
    input: 'w-full bg-transparent p-3 text-white text-sm focus:outline-none placeholder:text-zinc-600 uppercase font-medium',
    message: 'text-red-500 text-[9px] font-bold uppercase mt-1 italic',
};