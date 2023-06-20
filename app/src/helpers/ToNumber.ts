const ToNumber = (value: any) => {
    return (value ? value.units + value.nano / 1000000000 : value)
}

export default ToNumber