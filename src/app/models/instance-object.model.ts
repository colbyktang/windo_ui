import { Instance } from "../interfaces/instance";

export class InstanceObject implements Instance {
    instanceId: string;
    instanceName: string;
    instanceKeyName : string;
    instanceStatus : string;
    stateReason : string;
    publicIp : string;
    availabilityZone: string;
    constructor (
        public instance : any
    ) {
        this.instanceId = instance.InstanceId;
        this.instanceName = instance.Tags[0].Value;
        this.instanceKeyName = instance.KeyName;
        this.instanceStatus = instance.State.Name;
        this.stateReason = instance.StateTransitionReason;
        this.publicIp = instance.PublicIpAddress;
        this.availabilityZone = instance.Placement.AvailabilityZone;
    }
}
