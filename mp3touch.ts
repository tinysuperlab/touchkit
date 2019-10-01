
//% color=#0fbc11 icon="\uf120" block="mp3touch"
namespace mp3touch {

	serial.onDataReceived("", () => {
	})
	
    /**
     * @param command buffer to send
     */
    //% block="serial|send|command %command" 
    //% blockId=send_command
    function send(command: Buffer): void {
        for (let i = 0; i < command.length - 1; i++) {
            pins.i2cWriteNumber(34, command[i], NumberFormat.UInt8BE, true)
            basic.pause(1)
        }
        pins.i2cWriteNumber(34, command[7], NumberFormat.UInt8BE, false)
    }/*  */

	/**************************************************************** 
	 * Function Name: SpecifyMusicPlay
	 * Description: Specify the music index to play, the index is decided by the input sequence of the music.
	 * Parameters: index: the music index: 0-65535.
	 * Return: none
	 * @param index file number
	****************************************************************/
    //% blockId=playIndex
    //% block="Play | File | %index"
    export function playIndex(index: number) {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x03
        buf[4] = 0x00
        buf[5] = (index >> 8) & 0xFF
        buf[6] = index & 0xFF
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }



    /*************************************************************
     * Function Name: PlayMP3folder
     * Description: Plays the music specified in the MP3 folder.
     *              First create a folder named MP3. Then rename the music file to 0001.mp3,0002.mp3, and so on. Save these music files in the MP3 folder.
     *              The name must be Decimal. 
     * Parameters: index, the name of MP3 flie.
     * Return: none
     * @param index file number in folder MP3
    **************************************************************/
    //% blockId=playMP3Index
    //% block="Play | File | %index | in Folder MP3"
    export function playMP3Index(index: number) {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x12
        buf[4] = 0x00
        buf[5] = (index >> 8) & 0xFF
        buf[6] = index & 0xFF
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: specifyFolderIndex
     * Description: Specify the music index in the folder to play, the index is decided by the input sequence of the music.
     * Parameters: folder: folder name, must be number;  index: the music index.
     * Return: none
     * @param folder folder number
     * @param index file number
    ****************************************************************/
    //% blockId=specifyFolderIndex
    //% block="In folder | %folder | Play File | %index "
    export function specifyFolderIndex(folder: number, index: number)
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x0F
        buf[4] = 0x00
        buf[5] = folder & 0xFF
        buf[6] = index & 0xFF
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: pause
     * Description: Pause the MP3 player.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=
    //% block="pause"
    export function pause()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x0E
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        send(buf)
        basic.pause(20)
    }

    /**************************************************************** 
     * Function Name: resume
     * Description: Resume the MP3 player.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=resume
    //% block="resume"
    export function resume()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x0D
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        send(buf)
        basic.pause(20)
    }

    /**************************************************************** 
     * Function Name: PlayNext
     * Description: Play the next song.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=playNext
    //% block="Play next"
    export function playNext()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x01
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: PlayPrevious
     * Description: Play the previous song.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=playPrevious
    //% block="Play previous"
    export function playPrevious()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x02
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        this.send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: PlayLoop
     * Description: Play loop for all the songs.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=playLoop
    //% block="Loop all"
    export function playLoop()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x11
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x01
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: SetVolume
     * Description: Set the volume, the range is 0x00 to 0x1E.
     * Parameters: volume: the range is 0x00 to 0x1E.
     * Return: none
     * @param volume volume level
    ****************************************************************/
    //% blockId=setVolume
    //% block="Set volume to | %volume"
    export function setVolume(volume: number)
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x06
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = volume & 0x1E
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: IncreaseVolume
     * Description: Increase the volume.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=increaseVolume
    //% block="Volume up"
    export function increaseVolume()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x04
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    /**************************************************************** 
     * Function Name: DecreaseVolume
     * Description: Decrease the volume.
     * Parameters: none
     * Return: none
    ****************************************************************/
    //% blockId=decreaseVolume
    //% block="Volume down"
    export function decreaseVolume()
    {
        let buf = pins.createBuffer(8)
        buf[0] = 0x7E
        buf[1] = 0xFF
        buf[2] = 0x06
        buf[3] = 0x05
        buf[4] = 0x00
        buf[5] = 0x00
        buf[6] = 0x00
        buf[7] = 0xEF
        send(buf)
        basic.pause(10)
    }

    const ADDRESS = 0x5A;

    /**
     * Initialize MPR121 module.
     */
    //% weight=210
    //% blockId=grove_mpr121_init block="initialize Grove I2C Touch Sensor"
    //% blockExternalInputs=1
    //% parts="grove_mpr121"
    export function init(): void {
		
		// MPR121 Initialisierungswerte von Sparkfun funktionieren nicht (https://www.hackster.io/hhf/mpr121-touch-pad-an-calliope-mini-uber-i2c-2d19dc),
		// von Adafruit hingegen schon (http://multiwingspan.co.uk/micro.php?page=mpr121)
 		pins.i2cWriteNumber(ADDRESS, 0x8063, NumberFormat.UInt16BE)
		basic.pause(1)
		pins.i2cWriteNumber(ADDRESS, 0x5E00, NumberFormat.UInt16BE)
		let regval: number[] = [0x4106, 0x420C, 0x4306, 0x440C, 0x4506, 0x460C, 0x4706, 0x480C, 
                                0x4906, 0x4A0C, 0x4B06, 0x4C0C, 0x4D06, 0x4E0C, 0x4F06, 0x500C,
                                0x5106, 0x520C, 0x5306, 0x540C, 0x5506, 0x560C, 0x5706, 0x580C,
	   						    0x2B01, 0x2C01, 0x2D0E, 0x2E00, 0x2F01, 0x3005, 0x3101, 0x3200,
							    0x3300, 0x3400, 0x3500, 0x5B00, 0x5C10, 0x5D20, 0x5E8F]
							 
        for (let i = 0; i < regval.length; i++) {
			pins.i2cWriteNumber(ADDRESS, regval[i], NumberFormat.UInt16BE)
        }
    }
	
    /**
     * Return touched feeler.
     */
    //% weight=209
    //% blockId=grove_mpr121_feeler block="read feeler number"
    //% parts="grove_mpr121"
    export function touchedFeeler(): number {
		pins.i2cWriteNumber(ADDRESS, 0x0000, NumberFormat.UInt16BE)
        let feeler: number[] = [256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 1, 2, 4, 8]
		let result = pins.i2cReadNumber(ADDRESS, NumberFormat.UInt16BE);
		if (result==0) {
			return -2;	// no feeler touched: -2
		} else {
			return feeler.indexOf(result); // multiple feelers touched: -1
		}
        //return pins.i2cReadNumber(ADDRESS, NumberFormat.UInt16BE);		
    }
	
	    /**
     * Return touched feeler.
     */
    //% weight=211
    //% blockId=grove_mpr121_feelers block="read feelers"
    //% parts="grove_mpr121"
    export function touchedFeelers(): number {
		pins.i2cWriteNumber(ADDRESS, 0x0000, NumberFormat.UInt16BE)
        return pins.i2cReadNumber(ADDRESS, NumberFormat.UInt16BE);		
    }
}
